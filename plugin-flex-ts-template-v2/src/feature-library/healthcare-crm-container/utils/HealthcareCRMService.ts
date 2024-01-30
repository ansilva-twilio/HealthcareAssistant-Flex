import { EncodedParams } from 'types/serverless';
import ApiService from '../../../utils/serverless/ApiService';

class HealthcareCRMService extends ApiService {
  serverlessUrl = `${this.serverlessProtocol}://${this.serverlessDomain}`;

  fetchDoctorNotes = async (documentSid: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const encodedParams: EncodedParams = {
        documentSid: encodeURIComponent(documentSid),
        Token: encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
      };

      console.log(encodedParams);
      console.log(`${this.serverlessProtocol}://${this.serverlessDomain}/features/healthcare-crm-container/flex/fetch-doctor-notes`);
      
      this.fetchJsonWithReject<string>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/healthcare-crm-container/flex/fetch-doctor-notes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.buildBody(encodedParams),
        },
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(`Error fetching doctor notes ${documentSid} \r\n`, error);
          reject(error);
        });
    });
  };
}

export default new HealthcareCRMService();
