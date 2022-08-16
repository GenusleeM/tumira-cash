export const authRole = (role) =>{
    return (req,res,next) =>{
        if(req.user.role !== role){
            res.status(401)
            return res.send("Not Allowed")

        }
        next()
    }
}

export const CancelOrder = (role1,role2) =>{
    return (req,res,next) =>{
        
        if(req.user.role == role1 || req.user.role == role2){
            next()
        }else{
            res.status(401)
            return  res.json({
                success:false,
                message:"Not allowed to cancel orders"
            })

        }
        
    }
}

