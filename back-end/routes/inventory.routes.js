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
    
})
