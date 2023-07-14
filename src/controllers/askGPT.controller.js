export async function askController(req, res){
    console.log(req.body.question)
    res.send(req.body.question)
}
