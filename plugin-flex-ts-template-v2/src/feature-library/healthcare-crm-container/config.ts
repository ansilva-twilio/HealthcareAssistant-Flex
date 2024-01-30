import { getFeatureFlags } from '../../utils/configuration';
import HealthcareCrmContainerConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.healthcare_crm_container as HealthcareCrmContainerConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
