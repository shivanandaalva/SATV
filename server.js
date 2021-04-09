const express = require('express')
const axios = require('axios');
const app = express()
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser')
app.set('view engine', 'ejs' ); 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
  res.header("Set-Cookie", "HttpOnly;Secure;SameSite=None");
  next();   
});
app.get('/', (req, res) => {

  async function getdetails() {
    try {
      const response= await axios.get('https://tv-v2.api-fetch.sh/movies/1')
        var data =response.data;
        res.render('index',{data:data});

    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
})
app.get('/live', (req, res) => {
  async function getdetails() {
    try {
      const response= await   axios.get('https://iptv-org.github.io/iptv/channels.json')
        var data =response.data;
        res.render('live',{data:data}); 

    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
})
app.get('/movies', (req, res) => {

  async function getdetails() {
    try {
      const response= await   axios.get('https://tv-v2.api-fetch.sh/movies/1')
        var data =response.data;
        res.render('movies',{data:data});

    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
})
var i=2;
app.get('/next', (req, res) => {
async function getdetails() {
  try {
    const response = await  axios.get('https://tv-v2.api-fetch.sh/movies/'+i++)
      var data =response.data;
      res.render('pages',{data:data});

  } catch (error) {
    console.error(error);
  }
}
getdetails();
})
app.get('/previous', (req, res) => {
  if(i==1){
  async function getdetails() {
    try {
      const response= await   axios.get('https://tv-v2.api-fetch.sh/movies/1')
        var data =response.data;
        res.render('movies',{data:data});
  
    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
  }
  else{
  async function getdetails() {
    try {
      const response= await  axios.get('https://tv-v2.api-fetch.sh/movies/'+ i--)
        var data =response.data;
        res.render('pages',{data:data});
  
    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
  }
  })
  app.get('/shows', (req, res) => {
  async function getdetails() {
  try {
    const response= await  axios.get('https://tv-v2.api-fetch.sh/shows/1')
      var data =response.data;
      res.render('shows',{data:data});

  } catch (error) {
    console.error(error);
  }
}
getdetails();

})
  var s=2;
  app.get('/show-next', (req, res) => {
  async function getdetails() {
    try {
      const response= await  axios.get('https://tv-v2.api-fetch.sh/shows/'+ a++)
        var data =response.data;
        res.render('show-pages',{data:data});
  
    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
  })
  app.get('/show-previous', (req, res) => {

    if(s==1 ){
    async function getdetails() {
      try {
        const response= await axios.get('https://tv-v2.api-fetch.sh/shows/1')
          var data =response.data;
          res.render('shows',{data:data});
    
      } catch (error) {
        console.error(error);
      }
    }
    getdetails();
    }
    else{
    async function getdetails() {
      try {
        const response= await  axios.get('https://tv-v2.api-fetch.sh/shows/'+ s--)
          var data =response.data;
          res.render('show-pages',{data:data});
    
      } catch (error) {
        console.error(error);
      }
    }
    getdetails();
    }
    })
    app.get('/show/:id', (req, res) => {
      console.log(req.params.id);
      var id=req.params.id;
    
      async function getdetails() {
        try {
          const response= await axios.get('https://tv-v2.api-fetch.sh/show/'+id)
            var data =response.data;
            res.render('show-season',{data:data,id:req.params.id});
      
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();
    })
    app.get('/show/:id/:season', (req, res) => {
      console.log(req.params.id);
      var id=req.params.id;
      async function getdetails() {
        try {
          const response= await  axios.get('https://tv-v2.api-fetch.sh/show/'+id)
            var data =response.data;
            res.render('show-episodes',{data:data,id:req.params.id,season:req.params.season});
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();
    })
    app.get('/show/:id/:season/:ep', (req, res) => {
      var id=req.params.id;
      async function getdetails() {
        try {
          const response= await  axios.get('https://tv-v2.api-fetch.sh/show/'+id)
            var data =response.data;
            res.render('show-links',{data:data,id:req.params.id,season:req.params.season,ep:req.params.ep});
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();

    })

  app.get('/animes', (req, res) => {
  
  async function getdetails() {
    try {
      const response= await  axios.get('https://tv-v2.api-fetch.sh/animes/1')
        var data =response.data;
        res.render('animes',{data:data});
    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
  })
  var a=2;
  app.get('/anime-next', (req, res) => {

  async function getdetails() {
    try {
      const response= await  axios.get('https://tv-v2.api-fetch.sh/animes/'+ a++)
        var data =response.data;
        res.render('anime-pages',{data:data});
    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
  })

  app.get('/anime-previous', (req, res) => {
    if(a==1 ){
    async function getdetails() {
      try {
        const response= await  axios.get('https://tv-v2.api-fetch.sh/animes/1')
          var data =response.data;
          res.render('animes',{data:data});
      } catch (error) {
        console.error(error);
      }
    }
    getdetails();
    }
    else{
    async function getdetails() {
      try {
        const response= await  axios.get('https://tv-v2.api-fetch.sh/animes/'+ a--)
          var data =response.data;
          res.render('anime-pages',{data:data});
      } catch (error) {
        console.error(error);
      }
    }
    getdetails();
    }
    })

    app.get('/anime/:id', (req, res) => {
      console.log(req.params.id);
      var id=req.params.id;

      async function getdetails() {
        try {
          const response= await   axios.get('https://tv-v2.api-fetch.sh/anime/'+id)
            var data =response.data;
            res.render('anime-season',{data:data,id:req.params.id});
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();
    })

    app.get('/anime/:id/:season', (req, res) => {
      
      console.log(req.params.id);
      var id=req.params.id;

      async function getdetails() {
        try {
          const response= await  axios.get('https://tv-v2.api-fetch.sh/anime/'+id)
            var data =response.data;
            res.render('anime-episodes',{data:data,id:req.params.id,season:req.params.season});
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();
    })
    app.get('/anime/:id/:season/:ep', (req, res) => {
      var id=req.params.id;
      async function getdetails() {
        try {
          const response= await  axios.get('https://tv-v2.api-fetch.sh/anime/'+id)
            var data =response.data;
            res.render('anime-links',{data:data,id:req.params.id,season:req.params.season,ep:req.params.ep});
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();
    })

  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})