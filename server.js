const express = require('express')
const app = express()
var compression = require('compression')
const axios = require('axios').default;
var cors = require('cors')
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
const { render } = require('express/lib/response');
app.set('view engine', 'ejs' ); 
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/views'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
  next();   
});
var corsOptions = {
  origin: 'https://movies-api.tk/movies/1',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  origin: true,
  credentials: true,
}
app.get('/',cors(corsOptions), (req, res) => {
  const getdetails = async () => {
    try {
      
      const response = await axios.get('https://movies-api.tk/movies/1',{
         withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      });
        var data = response.data;
        // console.log(data);
        res.render('index',{data:data});
    }
    catch (error) {
      console.error(error);
    }
  }
  getdetails();
})
app.get('/donate', (req, res) => {

        res.render('donate');

})
app.get('/live', (req, res) => {
  async function getdetails() {
    try {
      const response= await axios.get('https://iptv-org.github.io/api/channels.json')
        var data =response.data;
        res.render('live',{data:data}); 
    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
})
app.get('/live/search/:input', (req, res) => {
  async function getdetails() {
    try {
      var input = req.params.input;
      const response = await axios.get('https://iptv-org.github.io/api/channels.json')
        var data = response.data;
        // console.log(data);
        res.render('live-search',{data:data,input:input});
    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
  
})

// app.get('/live', (req, res) => {
//   res.sendFile('./views/live.html');
// })
app.get('/watch', (req, res) => {
 
        res.sendFile(__dirname +'/views/watch.html');

})
app.get('/movies', (req, res) => {
  
  async function getdetails() {
    try {
      const response= await   axios.get('https://movies-api.tk/movies/1')
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
    const response = await  axios.get('https://movies-api.tk/movies/'+i++)
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
      const response= await   axios.get('https://movies-api.tk/movies/1')
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
      const response= await  axios.get('https://movies-api.tk/movies/'+ i--)
        var data =response.data;
        res.render('pages',{data:data});
  
    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
  }
  })
  app.get('/movie/:id', (req, res) => {
    // console.log(req.params.id);
    var id=req.params.id;

    async function getdetails() {
      try {
        const response= await   axios.get('https://movies-api.tk/movie/'+id)
          var data =response.data;
          res.render('movie-links',{data:data,id:req.params.id});
      } catch (error) {
        console.error(error);
      }
    }
    getdetails();
  })

  app.get('/movie/search/:input', (req, res) => {
    async function getdetails() {
      try {
        var input = req.params.input;
        const response = await axios.get('https://www.omdbapi.com/?t='+input+'&type=movie&apikey=bfbe2f73')
          var data = response.data;
          // console.log(data);
          res.render('movie-search',{data:data});
      } catch (error) {
        console.error(error);
      }
    }
    getdetails();
  })


  app.get('/shows', (req, res) => {
  async function getdetails() {
  try {
    const response= await  axios.get('https://shows.cf/shows/1')
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
      const response= await  axios.get('https://shows.cf/shows/'+ a++)
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
        const response= await axios.get('https://shows.cf/shows/1')
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
        const response= await  axios.get('https://shows.cf/shows/'+ s--)
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
      // console.log(req.params.id);
      var id=req.params.id;
    
      async function getdetails() {
        try {
          const response= await axios.get('https://shows.cf/show/'+id)
            var data =response.data;
            res.render('show-season',{data:data,id:req.params.id});
      
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();
    })
    app.get('/show/:id/:season', (req, res) => {
      // console.log(req.params.id);
      var id=req.params.id;
      async function getdetails() {
        try {
          const response= await  axios.get('https://shows.cf/show/'+id)
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
          const response= await  axios.get('https://shows.cf/show/'+id)
            var data =response.data;
            res.render('show-links',{data:data,id:req.params.id,season:req.params.season,ep:req.params.ep});
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();

    })

    app.get('/shows/search/:input', (req, res) => {
      async function getdetails() {
        try {
          var input = req.params.input;
          const response = await axios.get('https://www.omdbapi.com/?t='+input+'&type=series&apikey=bfbe2f73')
            var data = response.data;
            // console.log(data);
            res.render('shows-search',{data:data});
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();
      
    })
    app.get('/mahabharat', (req, res) => {
      async function getdetails() {
     try {
       const response= await  axios.get('https://api.streamtape.com/file/listfolder?login=7e75b50e929f540e967d&key=9XM4GADXvgh6mr&folder=RK6YzCwg-Vo')
       var data =response.data.result;
       var len=response.data.result.files;
     
       
       data.files.sort(function(a, b){return a.name - b.name});
     
         res.render('anime-episodes',{data:data,len:len});
     } catch (error) {
       console.error(error);
     }
   }
   getdetails();
   })
   app.get('/mahabharat/watch/:link', (req, res) => {
    var link=req.params.link;
          res.render('mahabharat-watch',{link:link});

  })
  app.get('/animes', (req, res) => {
     async function getdetails() {
    try {
      const response= await  axios.get('https://api.streamtape.com/file/listfolder?login=7e75b50e929f540e967d&key=9XM4GADXvgh6mr&folder=bXj9EbMOHL8')
        var data =response.data.result;
        var len=response.data.result.folders;
        // console.log(data);
        res.render('animes',{data:data,len:len});
    } catch (error) {
      console.error(error);
    }
  }
  getdetails();
  })
  var a=2;
  // app.get('/anime-next', (req, res) => {

  // async function getdetails() {
  //   try {
  //     const response= await  axios.get('https://popcorn-ru.tk/animes/'+ a++)
  //       var data =response.data;
      
  //       res.render('anime-pages',{data:data});
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // getdetails();
  // })

  // app.get('/anime-previous', (req, res) => {
  //   if(a==1 ){
  //   async function getdetails() {
  //     try {
  //       const response= await  axios.get('https://popcorn-ru.tk/animes/1')
  //         var data =response.data;
  //         res.render('animes',{data:data});
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getdetails();
  //   }
  //   else{
  //   async function getdetails() {
  //     try {
  //       const response= await  axios.get('https://popcorn-ru.tk/animes/'+ a--)
  //         var data =response.data;
  //         res.render('anime-pages',{data:data});
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getdetails();
  //   }
  //   })
    // app.get('/anime/:id', (req, res) => {
    //   console.log(req.params.id);
    //   var id=req.params.id;

    //   async function getdetails() {
    //     try {
    //       const response= await   axios.get('https://popcorn-ru.tk/anime/'+id)
    //         var data =response.data;
    //         res.render('anime-season',{data:data,id:req.params.id});
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    //   getdetails();
    // })

    app.get('/anime/season/:id', (req, res) => {
  
      async function getdetails() {
        try {
          var id=req.params.id;
          const response= await  axios.get('https://api.streamtape.com/file/listfolder?login=7e75b50e929f540e967d&key=9XM4GADXvgh6mr&folder='+id)
            var data =response.data.result;
            var len=response.data.result.folders;
            res.render('anime-season',{data:data,len:len});
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();
    })
    app.get('/anime/season/episode/:id', (req, res) => {
 
      async function getdetails() {
        try {
          var id=req.params.id;
          const response= await  axios.get('https://api.streamtape.com/file/listfolder?login=7e75b50e929f540e967d&key=9XM4GADXvgh6mr&folder='+id)
          var data =response.data.result;
          var len=response.data.result.files;
        
          
          data.files.sort(function(a, b){return a.name - b.name});
        
            res.render('anime-episodes',{data:data,len:len});
        } catch (error) {
          console.error(error);
        }
      }
      getdetails();
    })
    app.get('/anime/watch/:link', (req, res) => {
      var link=req.params.link;
            res.render('anime-watch',{link:link});

    })
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})