import Masyarakat from "../models/MasyarakatModel.js";
import joi from "joi";
import bcrypt from "bcrypt";

class MasyarakatController {
    async index(req, res) {
        const data = await Masyarakat.findAll();
        return res.json(data);
    }

    async store(req,res) {
        const data = req.body;

        const rules = joi.object({
            nik:joi.required(),
            nama: joi.required(),
            username: joi.required(),
            password: joi.number().required(),
        });

        const validatedData = rules.Validate(data);
        if (validatedData.error) return res.json({ msg: validatedData.error.detalis[0].message.replace(/"/g, '')});

        if((data.nik).includes(" ")){
            return res.json({msg:"Nik tidak boleh ada space"})

    }

    const hasil = await bcrypt.hash(data.password, 10)

    try {
        data.password= hasil;
        await massyarakat.created(data);
    } catch (e) {
        return res.json({ msg :"NIK tidak unique" })
    }

    return res.json ({ msg:"succes" });
} 

async update (req,res){
    const data = req.boody;
    const masyarakat = await Masyarakat.findOne({ where: {nik: req.params.id }})

    if (!masyarakat) return res.json({ msg: "Tidak ada masyarakat" });

        const rules = Joi.object({
            nama:Joi.required(),
            username:Joi.required(),
            telp:Joi.required(),
        });

        const validatedData = rules.validate(data);
        if (validatedData.error) return res.json({ msg: validatedData.error.details[0].message.replace(/"/g, '') });

        await Masyarakat.update(data,{where:{nik:masyarakat.nik}});

        return res.json({msg:"success"});
}
    async destroy(req, res) {
    const masyarakat = await Masyarakat.findOne({ where: { nik: req.params.id } });

    if (!masyarakat) return res.json({ msg: "Tidak ada masyarakat" });

    await Masyarakat.destroy({ where: { nik: masyarakat.nik } });

    return res.json({ msg: "success" });
    }

}

export default MasyarakatController; 

