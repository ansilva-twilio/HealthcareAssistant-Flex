import * as Flex from '@twilio/flex-ui';

import CRMContainer from '../custom-components/CRMContainer';
import { FlexComponent } from '../../../types/feature-loader';

export const componentName = FlexComponent.CRMContainer;
export const componentHook = function replaceAndSetCustomCRMContainer(flex: typeof Flex, _manager: Flex.Manager) {
  flex.CRMContainer.Content.replace(<CRMContainer key="custom--healthcare-crm-container" />, {
    sortOrder: 1,
  });
};
