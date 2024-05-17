// jwt key: HL34HO20ACO020HBNDPQ103J8NCOP

import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'HL34HO20ACO020HBNDPQ103J8NCOP');

            req.userId = decoded.userId;
            next();
        }
        catch (err) {
            res.status(403).json({
                message: 'Немає доступа'
            });
        }
    }
    else {
        res.status(403).json({
            message: 'Немає доступа'
        });
    }
}