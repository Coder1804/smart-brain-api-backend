const  profilehandler = (req,res , db)=>{
    const {id} = req.params;
    db.select('*')
    .from('users')
    .where({
        id : id
    })
    .then(user=>{   
        if(user.length)
        {
            res.json(user[0]);
        }else 
        {
            res.status(400).json("Bunday Foydalanuvchi yo'q")
        }
       
    })
    .catch(err => res.status(400).json("foydalanuvchi xatolik qaytyabdi!"))
  
}

module.exports = {
    profilehandler : profilehandler
}