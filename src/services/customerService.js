const Customer = require("../models/customer");
const aqp = require('api-query-params')
const bcrypt=require('bcrypt');
const saltRounds = 10;

const createCustomerService = async (customerData) => {
    try {
        // hash customer password
        //save customer
        const hashPassword = await bcrypt.hash(customerData.password,saltRounds)
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            password:hashPassword,
            description: customerData.description,
            image: customerData.image
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result

    } catch (error) {
        console.log("error >>>> ", error);
        return null;
    }
}
const getCustomerService = async(limit,page,name,queryString) =>{
    try {
        let result = null;
        if(limit&& page){
            let offset = (page- 1)*limit;
            // if(name){
            //   result = await Customer.find(
            //     {
            //         "name":{
            //             $regex: ' .*' +name + '.*'
            //         }
            //     }
            // ).skip(offset).limit(limit).exec()
            // }else
            // result= await Customer.find({}).skip(offset).limit(limit).exec()
            const{filter}=aqp(queryString)
            delete filter.page;
            result= await Customer.find({filter}).skip(offset).limit(limit).exec()
        }else{
            result = await Customer.find({})
        }
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}
const updateUserService = async(id,name,email,address) =>{
    try {
        let results=await Customer.updateOne({_id:id},{name,email,address})
        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const deleteACustomerService = async(id) =>{
    try {
       let results = await Customer.deleteById(id)
       return results
    } catch (error) {
        console.log(error);
        return null;
    }
}
const deleteArrayCustomerService = async (arrIds) => {
    try {
        let result = await Customer.delete({ _id: { $in: arrIds } });
        return result;

    } catch (error) {
        console.log("error >>>> ", error);
        return null;
    }
}



module.exports = {
    createCustomerService,createArrayCustomerService,getCustomerService,updateUserService,deleteACustomerService,deleteArrayCustomerService
}
