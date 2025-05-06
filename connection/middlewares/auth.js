import jwt from 'jsonwebtoken'
const SECRETKEY="1234567890abcdefgh"


const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token)
        return res.status(403).send({message:"Unauthorized Access"})//token 3parts:<header>.<payload>.<signature>header-contains meta data,payload-user data,signature-ensures the token is not tampered
    const ogToken=token.split(' ')[1];
    if(!ogToken)
        return res.status(403).send({message:'Unauthorized Access'})
    try{
        const decodedData=jwt.verify(ogToken,SECRETKEY)
        req.user=decodedData
        req.id=req.params.id
        next();//sent to next path
    }catch(error){
        return res.status(403).send({message:"Unauthorized Access"})
    }
}
export default auth