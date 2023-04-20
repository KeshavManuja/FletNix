const validatorResponse = (schema, property) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            const { details } = error;
            console.log(error);
            const message = details.map(i => i.message).join(',');
            const field = details.map(i => i.path[0]).join(',');
            let error_response = {
                errors: {
                    [field]: message
                },
            };
            return res.status(422).json({
                message: error_response
            })
        }
    }
}

module.exports = validatorResponse;