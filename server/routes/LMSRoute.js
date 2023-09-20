const { Router } = require('express');
const {
  getbyid,
  getLMS,
  addLMS,
  updateLMS,
  deleteLMS
} = require('../controllers/LMSController');
const router = Router();

router.get('/getbyid', getbyid);
router.get('/getall', getLMS);
router.post('/add', addLMS);
router.patch('/update', updateLMS);
router.delete('/delete/:_id', deleteLMS);


module.exports = router;
