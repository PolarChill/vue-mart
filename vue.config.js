module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        //中间件
        app.use(function(req,res, next){
          if(/^\/api/.test(req.path)) {
            // 只校验/api的接口
            if(req.path === '/api/login' || req.headers.token) {
              next()
            } else {
              res.sendStatus(401);// 错误状态需要提示用户认证
            }
          }
          next()
        })
        app.get('/api/goods', function(req, res) {
          res.json({
            code: 0,
            list: [{ id: '1', name: '葡萄', price: '15' }, { id: '2', name: '苹果', price: '12' }, { id: '3', name: '西瓜', price: '5' }, { id: '4', name: '小柿子', price: '23' }]
          });
        });
        app.get('/api/login', function(req, res) {
          const { username, password } = req.query;
          if (username === 'qwe' && password === '123') {
            res.json({
              code: 0,
              token: 'hukui'
            });
          } else {
            res.json({
              code: '1',
              message: '用户或密码错误'
            });
          }
        });
        // app.post('/api/login', function(req, res) {
        //   const { username, password } = req.body;
        //   if (username === 'qwe' && password === '123') {

        //     res.json({
        //       code: 0,
        //       token: 'hukui'
        //     });
        //   } else {
        //     res.json({
        //       code: '1',
        //       message: '用户或密码错误'
        //     });
        //   }
        // });
        app.get('/api/logout', function(req, res) {
          res.json({
            code: -1
          })
        });
      }
    }
  }
};
