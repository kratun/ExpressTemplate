module.exports = {
    get: {
        start(req,res,next){
            console.log('start url')
            res.redirect('/home');
        },
        
    },

};