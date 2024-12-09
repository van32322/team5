const {
  createCustomerService,
  createArrayCustomerService,
  getCustomerService,
  updateUserService,
  deleteACustomerService,
} = require("../services/customerService");
const aqp = require("api-query-params");
const Joi = require("joi");
// {key: value}
module.exports = {
  postCreateCustomer: async (req, res) => {
    try {
      // Validate input
      const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        address: Joi.string().allow(""), // Cho phép bỏ trống
        phone: Joi.string().pattern(new RegExp("^[0-9]{8,11}$")),
        email: Joi.string().email(),
        password: Joi.string().min(4).required(),
        description: Joi.string().allow(""), // Cho phép bỏ trống
      });
  
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          message: "Validation failed",
          details: error.details,
        });
      }
  
      // Kiểm tra ảnh
      let imageUrl = "";
      if (req.file) {
        imageUrl = req.file.path.replace(/\\/g, "/"); // Thay đường dẫn `\` bằng `/` trên Windows
      }
  
      // Tạo dữ liệu khách hàng
      const customerData = {
        name: req.body.name,
        address: req.body.address || "",
        phone: req.body.phone || "",
        email: req.body.email,
        password: req.body.password,
        description: req.body.description || "",
        image: imageUrl,
      };
  
      const customer = await createCustomerService(customerData);
  
      return res.status(201).json({
        message: "Customer created successfully",
        data: customer,
      });
    } catch (error) {
      console.error("Error in postCreateCustomer:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  postCreateArrayCustomer: async (req, res) => {
    let customers = await createArrayCustomerService(req.body.customers);
    if (customers) {
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customers,
      });
    }
  },
  getAllCustomer: async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let name = req.query.name;
    let result = null;
    if (limit && page) {
      result = await getCustomerService(limit, page, name, req.query);
    } else result = await getCustomerService();
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putUpdateCustomer: async (req, res) => {
    let { id, name, email, address } = req.body;
    let customer = await updateUserService(id, name, email, address);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  deleteACustomer: async (req, res) => {
    let id = req.body.id;
    let customer = await deleteACustomerService(id);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  deleteArrayCustomer: async (req, res) => {
    let ids = req.body.customersId;
    console.log(" check ids: ", ids);
    let result = await this.deleteArrayCustomerService(ids);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
