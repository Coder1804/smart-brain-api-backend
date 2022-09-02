const handleRegister =  (req , res , db ,bcrypt)=>{
    const {email , name , password} = req.body;
    if(!password || !email || !name)
    {
        return res.status(400).json("noto'g'ri form to'ldirish!")
    }
    var hash = bcrypt.hashSync(password);
    db.transaction(trx =>{
        trx.insert({
            hash: hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trx('users')
            .returning('*')
            .insert({
             email : loginEmail[0].email,
             name:name,
             joined: new Date()
            })
            .then(user => {
             res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(error => res.status(400).json("ro'yxatdan o'tib bo'lmaydi!"))
  
}

module.exports = {
 handleRegister:handleRegister   
}