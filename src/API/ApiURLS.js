const host = 'https://videosolutionapi-stage.azurewebsites.net/';

export const urls = {
  user: {
    login: `${host}Agent/AgentLogin`,
    retailerConfig: `${host}Agent/AgentConfig`,
    token: `${host}services/v2/UpdateAgentDeviceToken`,
    updateAgentStatus: `${host}services/UpdateAgentStatus`,
  },
};
