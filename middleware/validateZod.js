export const validate = (schema) => (req, res, next) => {

    const result = schema.safeParse(req.body);

    console.log("result is ", result);

    if (!result.success) {

        const formated = result.error.format();

        console.log("formatted ", formated);

        return res.status(400).json({
            success: false,
            message: "validation failed",
            error: Object.keys(formated).map(field => ({
                field,
                message: formated[field]?._errors?.[0] || "Invalid Input"
            }))
        });
    }

    next();
};