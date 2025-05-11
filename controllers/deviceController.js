const { Device, User } = require('../models');

exports.registerDevice = async (req, res) => {
  const { device_name, serial_number } = req.body;
  if (!device_name || !serial_number) return res.status(400).json({ error: 'device_name and serial_number required' });

  try {
    const existing = await Device.findOne({ where: { serial_number } });
    if (existing) return res.status(400).json({ error: 'Device already exists' });

    const device = await Device.create({ device_name, serial_number });
    res.status(200).json(device);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllDevices = async (req, res) => {
  const devices = await Device.findAll();
  res.status(200).json(devices);
};

exports.getDeviceBySerial = async (req, res) => {
  const serial = req.params.serial;
  const device = await Device.findOne({ where: { serial_number: serial } });

  if (!device) return res.status(404).json({ error: 'Device not found' });

  res.status(200).json(device);
};

exports.takeDevice = async (req, res) => {
  const { serial_number, user_name } = req.body;

  const device = await Device.findOne({ where: { serial_number } });
  if (!device) return res.status(404).json({ error: 'Device not found' });

  if (device.user_name) return res.status(400).json({ error: 'Device already taken' });

  const user = await User.findOne({ where: { user_name } });
  if (!user) return res.status(400).json({ error: 'User not registered' });

  device.user_name = user_name;
  await device.save();

  res.status(200).json({ message: 'Device assigned to user' });
};

router.post('/register-user', async (req, res) => {
  const { user_name } = req.body;

  if (!user_name) return res.status(400).json({ error: "user_name is required" });

  const existing = await User.findOne({ where: { user_name } });
  if (existing) return res.status(400).json({ error: "User already exists" });

  await User.create({ user_name });
  res.sendStatus(200);
});
