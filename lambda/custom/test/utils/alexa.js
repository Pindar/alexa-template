const getOutputSpeech = ({ response: { outputSpeech: { ssml } } }) =>
  ssml.trim();

const getAttribute = ({ sessionAttributes }, attr) => sessionAttributes[attr];

export const responseHelper = {
  getOutputSpeech,
  getAttribute,
};

// TODO Fixure Builder/Adapter

