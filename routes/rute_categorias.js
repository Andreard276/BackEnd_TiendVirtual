const express = require('express');
const router = express.Router();
const { tbc_categorias } = require('../models');

router.get('/api/categorias', async (req, res) => {
	try {
		const categorias = await tbc_categorias.findAll({
			order: [['id', 'ASC']],
		});

		return res.status(200).json(categorias);
	} catch (error) {
		return res.status(500).json({
			message: 'Error al obtener categorias',
			error: error.message,
		});
	}
});

module.exports = router;
