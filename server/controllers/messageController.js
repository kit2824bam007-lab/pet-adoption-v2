const Message = require('../models/Message');
const User = require('../models/User');
const Pet = require('../models/Pet');

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, petId, content } = req.body;

    console.log('Sending message:', { senderId, receiverId, petId, contentLength: content?.length });

    if (!senderId || !receiverId || !petId || !content) {
      return res.status(400).json({ message: 'All fields are required (senderId, receiverId, petId, content)' });
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      pet: petId,
      content
    });

    await message.save();

    // Also add a notification to the receiver
    try {
      const receiver = await User.findById(receiverId);
      const sender = await User.findById(senderId);
      
      if (receiver) {
        if (!receiver.notifications) {
          receiver.notifications = [];
        }
        
        receiver.notifications.push({
          message: `${sender?.username || 'A user'} sent you a message about a pet: "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"`,
          createdAt: new Date()
        });
        
        await receiver.save();
      }
    } catch (notifError) {
      console.error('Notification error:', notifError);
      // Don't fail the whole request if only notification fails
    }

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

exports.getMessagesForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({ 
      $or: [{ sender: userId }, { receiver: userId }] 
    })
    .populate('sender', 'username email')
    .populate('receiver', 'username email')
    .populate('pet', 'name image')
    .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
