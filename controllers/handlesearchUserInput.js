const customerData = require("../models/customerData");
exports.handlesearchUserInput = async (req, res) => {
  const { city, category, subcategory } = req.query;

  try {
    const query = {};

    if (city) {
      query.company_city = city;
    }
    if (category) query.category = category;

    if (subcategory) query.subcategory = subcategory;

    const suppliers = await customerData.find(query);

    if (suppliers.length === 0) {
      res
        .status(404)
        .json({ message: "No suppliers found matching your criteria"});
    } else {
      res.status(200).json(suppliers);
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while searching for suppliers",
        error: error.message,
      });
  }

  // try {
  //     const findname = req.params.name;
  //     const objs = await customerData.find({
  //         "$or": [
  //             { companyName: { $regex: findname } }
  //         ]
  //     });

  //     // res.send("search done")
  //     res.json(objs);
  //     console.log("yes running correctly")
  // }
  // catch (error) {
  //     res.json({ message: error });

  // }
};
