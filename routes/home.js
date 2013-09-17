exports.home = function(req, res){
    var response = '<a href="/">Home</a>';

    response += '<pre>';
    response += 'POST parameters: \n';
    response += JSON.stringify({
        password: req.body.password,
        email: req.body.email
    });
    response += '\n\nGET parameters\n';
    response += JSON.stringify({
        welcome: req.body.email
    });
    response += '</pre>';

    res.set('Content-type', 'text/html');
    res.send(response);
};
