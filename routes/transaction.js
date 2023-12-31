const router = require("express").Router();
const multer  = require('multer');
const upload = multer();
const uniqid = require('uniqid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync', {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
  });

router.get("/", upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));
    let transactions = db.get("transactions").filter({account_id: request.query.account_id}).value();
    response.json({ success: true, data: transactions });
});

router.delete("/", upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));
    let transactions = db.get("transactions");
    let { id } = request.body;
    let removingTransaction = transactions.find({id});
    if(removingTransaction.value()){
        transactions.remove({id}).write();
        response.json({ success: true });
    }else{
        response.json({ success: false });
    }
});

router.put("/", upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));
    let transactions = db.get("transactions");
    const reg =  /^\-?\d+(\.?\d+)?$/;
    const { type, name, sum, account_id } = request.body;
    let currentUser = db.get("users").find({id: request.session.id}).value();
    if(!currentUser)
        response.json({ success: false, error:"Необходима авторизация" });
    else{
        if (reg.test(sum)) {
            let currentUserId = currentUser.id;
            transactions.push({
                id: uniqid(),
                type: type.toLowerCase(),
                name,
                sum: +sum,
                account_id,
                user_id: currentUserId,
                created_at: new Date().toISOString()
            }).write();
            response.json({success: true});
        } else {
            response.json({ success: false, error:"Недопустимые символы в поле Сумма" });
        }
    }
});

router.put("/edit", upload.none(), function(request, response) {
    const db = low(new FileSync('db.json'));
    let transactions = db.get("transactions");
    const reg =  /^\-?\d+(\.?\d+)?$/;
    console.log('request', request.body)
    const { id, type, name, sum, account_id } = request.body;
    
    const currentUser = db.get("users").find({id: request.session.id}).value();
    if(!currentUser)
        response.json({ success: false, error: "Not authorized" }).status(401);
    else{
        if (reg.test(sum)) {
            const transaction = transactions.find({id});
            if(transaction.value()){
                console.log('transaction', transaction.value())
                transaction.assign({
                    type: type.toLowerCase(),
                    name,
                    sum: +sum,
                    account_id,
                    created_at: new Date().toISOString()
                }).write();
                response.json({success: true});
            }else{  
                response.json({ success: false, error: "Transaction not found" });
            }
        }
    }
});

module.exports = router;
