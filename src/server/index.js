const 	express 	= require('express'),
		request		=require("request"),
		langs 		= require('langs'),
		rp 			=require("request-promise"),
		bodyParser 	=require("body-parser");



const os = require('os');
const app = express();

//we're using dotenv package to handle environment variable in safty way (including secrets)
require('dotenv').config();
app.use(express.static('dist'));

//Adding middlewares
app.use(bodyParser.json());//middleware  that only parse json
app.use(bodyParser.urlencoded({extended:true})); //To parse post request stream to  req. body
// app.set("view engine", "ejs"); //we inform that our template engine is EJS setting variable "view engine" on "EJS"
app.use(genresList);
app.use(languagesList);
app.use(yearsList);


app.get("/api", (req, res) =>{
	var data={
		genresList: res.locals.genres.map(genre => genre.name),
		languagesList: res.locals.languages.map(language => language.name),
		yearsList:res.locals.years
	}
  res.json(data)
});

app.post('/api', (req,res) => {
	var {people, genres, release, language}=req.body;
	var IdOfGenre = genreId(res.locals.genres, genres);
	var ISOofLanguage = languageISO(res.locals.languages, language);
	personId(people)
	.then(result => {
		var url = prepareUrl(result, IdOfGenre, ISOofLanguage, release);
		request(url, (err, response, body)=>{
			var result=JSON.parse(body).results;
			if(err || result.length===0){
				var data={
					title:"We do not have any movies for you :(",
					overview: "Try to change the criteria!"
				};
				console.log("Error: we have a problem with API request");
				return res.json(data);
			}else{
				var random=Math.floor(Math.random()*(result.length))+1;
				console.log("Successfully request");
				return res.json(result[random-1]);
			};
		})
	})
	.catch( err => {
		var data={
			title: "Unfortunatelly, something went wrong :(",
			overview:"Try later or change the criteria!"
		};
		console.log("Error: we have a problem with finding person ID");
		return res.json(data);
	})


});




//ADDITIONAL FUNCTIONS
//get list of all genres
function genresList(req, res, next){
	rp("https://api.themoviedb.org/3/genre/movie/list?api_key="+process.env.API_KEY+"&language=en-US")
		.then(function(body){res.locals.genres=JSON.parse(body).genres.map(function(genre){
				return {name: genre.name,
						id: genre.id}
			});
			next();
		})
		.catch(function(err){
			console.log(err)
		})
	
};

//get list of all languages
function languagesList(req,res,next){
	res.locals.languages=langs.all();
	next();
};


//get list of all years of releases
function yearsList(req,res,next){
	var datetime = new Date();
	res.locals.years=[];
 	for(let i=datetime.getUTCFullYear(); i>=1950; i--){
 		res.locals.years.push(i);
 	};
 	next();
};

//find id for genre
function genreId(list, name){
	var result = list.find(genre => genre.name===name);
	if (typeof result !== "undefined"){return list.find(genre => genre.name===name).id}else{return ""}
};

//find ISO for language

function languageISO(list, name){
	var result= list.find(language => language.name ===name);
	if (typeof result === "undefined"){return ""}else{return result["1"]};
}

//find id for person
function personId(person){
	var promise= new Promise((resolve, reject)=>{
		request("http://api.tmdb.org/3/search/person?api_key="+process.env.API_KEY+"&query="+person,
			(err,response,body)=>{
				if(err || JSON.parse(body).results.length===0 || JSON.parse(body).results==="undefined"){reject(err)}
				else{resolve(JSON.parse(body).results[0].id)};
			});
	});
	return promise
}

//preparation url for final request
function prepareUrl(people, genres, language, year){
	const url_base="https://api.themoviedb.org/3/discover/movie?api_key="+process.env.API_KEY;
	with_people="&with_people="+people,
			with_genres="&with_genres="+genres,
			with_original_language="&with_original_language="+language,
			with_year="&year="+ year;
	return url_base+with_people+with_genres+with_original_language+with_year+"&sort_by=popularity.desc&region=US";
}


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
