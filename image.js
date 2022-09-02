const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const USER_ID = 'kcf385pfk1nc';
const PAT = 'fa9834f113b840e4ad91b036373c191d';
const APP_ID = 'my-react-app';
const MODEL_ID = 'general-image-detection';
const MODEL_VERSION_ID = '3df9e7b5c0f74a369919f6c0227afa08';  
const stub = ClarifaiStub.grpc();
// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);


const handleApiCall = (req , res) =>{
    let   IMAGE_URL = req.body.input;
    stub.PostModelOutputs(
    
        {
            user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            model_id: MODEL_ID,
            version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version.
            inputs: [
                { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }
    
            // if (response.status.code !== 10000) {
            //     throw new Error("Post model outputs failed, status: " + response.status.description);
            // }
    
            // Since we have one input, one output will exist here.
            return res.json(response);
        }
    
    );
}



const imageHandler = (req , res , db)=>{
    const {id} = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries' , 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('xisoblashda xatolik!'));
    
    
}

module.exports = {
    imageHandler:imageHandler,
    handleApiCall : handleApiCall,
}