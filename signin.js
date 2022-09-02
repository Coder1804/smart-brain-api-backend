const signinHandler = (req,res,db,bcrypt)=>{
    const {email, password} = req.body;
    if(!password || !email)
    {
        return res.status(400).json("noto'g'ri form to'ldirish!")
    }
    db.select('email', 'hash')
    .from('login')
    .where('email' , '=' , email)
    .then(data=>
        {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid)
            {
                return db.select('*')
                         .from('users')
                         .where('email' , '=' , email)
                         .then(user => {
                            res.json(user[0])
                         })
                         .catch(err => {res.status(400).json("foydalanuvchi qabul qilinmadi!")})
            }else{
                res.status(404).json("xato ma'lumotlar!!!!")
            }
        })
    .catch(err =>res.status(404).json("xato ma'lumotlar!")
     )    
    
}




module.exports = {
    signinHandler:signinHandler,
}