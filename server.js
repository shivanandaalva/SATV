const express = require('express')
const fetch = require('node-fetch');
const app = express()
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser')

app.set('view engine', 'ejs' ); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use('/show/:id', express.static(__dirname + '/views'));

app.use(express.static(__dirname + '/views'));






app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
  
  next();   
});



app.get('/', (req, res) => {
  fetch('https://tv-v2.api-fetch.sh/movies/1')
  
  .then(function (response) {
    return response.json();
  
  })

  .then(function (data) {

  
    res.render('index',{data:data});
  
  })
  .catch(function (err) {
    console.log(err);
  });












})

app.get('/live', (req, res) => {
  res.render('live');
})

app.get('/movies', (req, res) => {

 fetch('https://tv-v2.api-fetch.sh/movies/1')
  
  .then(function (response) {
    return response.json();
  
  })
  .then(function (data) {

    // console.log(data.episodes[0].torrents[0].url);
appendData(data);
  
  })
  .catch(function (err) {
    console.log(err);
  });



function appendData(data){
 
  res.render('movies',{data:data});
}





})



var i=2;

app.get('/next', (req, res) => {
console.log("clicked");


  fetch('https://tv-v2.api-fetch.sh/movies/'+ i++)
  
  .then(function (response) {
    return response.json();
  
  })
  .then(function (data) {

    // console.log(data.episodes[0].torrents[0].url);
appendData(data);
  
  })
  .catch(function (err) {
    console.log(err);
  });



function appendData(data){
  res.render('pages',{data:data});
}


})



app.get('/previous', (req, res) => {
  console.log("clicked");

  if(i==1){
    fetch('https://tv-v2.api-fetch.sh/movies/1')
    
    .then(function (response) {
      return response.json();
    
    })
    .then(function (data) {
  
      // console.log(data.episodes[0].torrents[0].url);
  appendData(data);
    
    })
    .catch(function (err) {
      console.log(err);
    });
  
  
  
  function appendData(data){
    res.render('movies',{data:data});
  } 
  }
  else{
    fetch('https://tv-v2.api-fetch.sh/movies/'+ i--)
    
    .then(function (response) {
      return response.json();
    
    })
    .then(function (data) {
  
      // console.log(data.episodes[0].torrents[0].url);
  appendData(data);
    
    })
    .catch(function (err) {
      console.log(err);
    });
  
  
  
  function appendData(data){
    res.render('pages',{data:data});
  }
  }

  
  
  })

  



  app.get('/shows', (req, res) => {
    fetch('https://tv-v2.api-fetch.sh/shows/1')
  
    .then(function (response) {
      return response.json();
    
    })
    .then(function (data) {
  
      
  appendData(data);
    
    })
    .catch(function (err) {
      console.log(err);
    });
  
  
  
  function appendData(data){
   
    res.render('shows',{data:data});
  }
  })

  var s=2;

  app.get('/show-next', (req, res) => {
  console.log("clicked");
  
  
    fetch('https://tv-v2.api-fetch.sh/shows/'+ a++)
    
    .then(function (response) {
      return response.json();
    
    })
    .then(function (data) {
  
 
  appendData(data);
    
    })
    .catch(function (err) {
      console.log(err);
    });
  
  
  
  function appendData(data){
    res.render('show-pages',{data:data});
  }
  
  
  })

  app.get('/show-previous', (req, res) => {
    console.log("clicked");
  
    if(s==1 ){
      fetch('https://tv-v2.api-fetch.sh/shows/1')
      
      .then(function (response) {
        return response.json();
      
      })
      .then(function (data) {
    
        
    appendData(data);
      
      })
      .catch(function (err) {
        console.log(err);
      });
    
    
    
    function appendData(data){
      res.render('shows',{data:data});
    } 
    }
    else{
      fetch('https://tv-v2.api-fetch.sh/shows/'+ s--)
      
      .then(function (response) {
        return response.json();
      
      })
      .then(function (data) {
    
     
    appendData(data);
      
      })
      .catch(function (err) {
        console.log(err);
      });
    
    
    
    function appendData(data){
      res.render('show-pages',{data:data});
    }
    }
  
    
    
    })


    app.get('/show/:id', (req, res) => {
 
      console.log(req.params.id);
      var id=req.params.id;
      fetch('https://tv-v2.api-fetch.sh/show/'+id)
    
      .then(function (res) {
        return res.json();
      
      })
      .then(function (data) {
        res.render('show-season',{data:data,id:req.params.id});

      })
      .catch(function (err) {
        console.log(err);
      });

   
   
    })

    app.get('/show/:id/:season', (req, res) => {
      
      console.log(req.params.id);
      var id=req.params.id;
     
      fetch('https://tv-v2.api-fetch.sh/show/'+id)
    
      .then(function (res) {
        return res.json();
      
      })
      .then(function (data) {
        res.render('show-episodes',{data:data,id:req.params.id,season:req.params.season});

      })
      .catch(function (err) {
        console.log(err);
      });

   
   

    })

  app.get('/animes', (req, res) => {
    fetch('https://tv-v2.api-fetch.sh/animes/1')
  
    .then(function (response) {
      return response.json();
    
    })
    .then(function (data) {
  
  appendData(data);
    
    })
    .catch(function (err) {
      console.log(err);
    });
  
  
  
  function appendData(data){
   
    res.render('animes',{data:data});
  }
  })



  var a=2;

  app.get('/anime-next', (req, res) => {
  console.log("clicked");
  
  
    fetch('https://tv-v2.api-fetch.sh/animes/'+ a++)
    
    .then(function (response) {
      return response.json();
    
    })
    .then(function (data) {
  
 
  appendData(data);
    
    })
    .catch(function (err) {
      console.log(err);
    });
  
  
  
  function appendData(data){
    res.render('anime-pages',{data:data});
  }
  
  
  })

  app.get('/anime-previous', (req, res) => {
    console.log("clicked");
  
    if(a==1 ){
      fetch('https://tv-v2.api-fetch.sh/animes/1')
      
      .then(function (response) {
        return response.json();
      
      })
      .then(function (data) {
    
        
    appendData(data);
      
      })
      .catch(function (err) {
        console.log(err);
      });
    
    
    
    function appendData(data){
      res.render('animes',{data:data});
    } 
    }
    else{
      fetch('https://tv-v2.api-fetch.sh/animes/'+ a--)
      
      .then(function (response) {
        return response.json();
      
      })
      .then(function (data) {
    
     
    appendData(data);
      
      })
      .catch(function (err) {
        console.log(err);
      });
    
    
    
    function appendData(data){
      res.render('anime-pages',{data:data});
    }
    }
  
    
    
    })




    app.get('/anime/:id', (req, res) => {
 
      console.log(req.params.id);
      var id=req.params.id;
      fetch('https://tv-v2.api-fetch.sh/anime/'+id)
    
      .then(function (res) {
        return res.json();
      
      })
      .then(function (data) {
        res.render('anime-season',{data:data,id:req.params.id});

      })
      .catch(function (err) {
        console.log(err);
      });

   
   
    })



    app.get('/show/:id/:season', (req, res) => {
      
      console.log(req.params.id);
      var id=req.params.id;
     
      fetch('https://tv-v2.api-fetch.sh/show/'+id)
    
      .then(function (res) {
        return res.json();
      
      })
      .then(function (data) {
        res.render('show-episodes',{data:data,id:req.params.id,season:req.params.season});

      })
      .catch(function (err) {
        console.log(err);
      });

   
   

    })
    app.get('/anime/:id/:season', (req, res) => {
      
      console.log(req.params.id);
      var id=req.params.id;
     
      fetch('https://tv-v2.api-fetch.sh/anime/'+id)
    
      .then(function (res) {
        return res.json();
      
      })
      .then(function (data) {
        res.render('anime-episodes',{data:data,id:req.params.id,season:req.params.season});

      })
      .catch(function (err) {
        console.log(err);
      });

   
   

    })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})