const express = require("express");
const { InventoryModel } = require("../model/inventory.model");
const inventory = express.Router();

inventory.get("/", async (req, res) => {
  try {
    const obj = req.body;
    let arr = [];
    if (obj.model) arr.push({ model: new RegExp(obj.model, "i") });
    if(obj.color)arr.push({color:{$in:[obj.color]}})
    if (obj.min_price) arr.push({ price: { $gte: obj.min_price } });
    if (obj.max_price) arr.push({ price: { $lte: obj.max_price } });
    if (obj.min_mileage) arr.push({ mileage: { $gte: obj.min_mileage } });
    if (obj.max_mileage) arr.push({ mileage: { $lte: obj.max_mileage } });
    let data;
    if (req.limit) {
      data = await InventoryModel.find({ $and: arr })
        .populate("OEM_Spec")
        .populate("dealer")
        .skip(req.page)
        .limit(req.limit);
    } else {
      data = await InventoryModel.find({ $and: arr })
        .populate("OEM_Spec")
        .populate("dealer");
    }

    res.send(200).send(data);
  } catch (error) {
    res.status(400).send("Not able to get the data");
  }
});

inventory.post('/', async(req, res)=>{
    const userid = req.headers.userid;
    const body = req.body;
    try {
        const item = new InventoryModel({dealer:userid, ...body});
        await item.save();
        res.status(201).send("Item is created")
    } catch (error) {
        res.status(400).send("Not able to create the Item");
    }
})

inventory.patch('/:_id', async(req, res)=>{
    const userid = req.headers.userid;
    const  {_id} = req.params;
    const body = req.body;
    try {
        const data = await InventoryModel.find({_id, dealer:userid});
        if(data.length){
            let data = await InventoryModel.findByIdAndUpdate(body, null, {new:true});
            res.status(202).send(data);

        }else {
            res.status(401).send("Your are not allowed to change this Item")
        }
    } catch (error) {
        res.status(400).send("Error in updating the data");
    }
})

inventory.delete('/:_id', async(req, res)=>{
    const userid = req.headers.userid;
    const  {_id} = req.params;
    try {
        const data = await InventoryModel.find({_id, dealer:userid});
        if(data.length){
            let data = await InventoryModel.findByIdAndDelete({_id});
            res.status(202).send(data);

        }else {
            res.status(401).send("Your are not allowed to delete this Item")
        }
    } catch (error) {
        res.status(400).send("Error in Deleting the data");
    }
})

module.exports = {inventory}
