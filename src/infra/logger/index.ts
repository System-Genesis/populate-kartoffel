import logger from 'logger-genesis';
import config from '../../config';

export const initializeLogger = async () => {
    await logger.initialize(config.logger.systemName, config.logger.serviceName, config.logger.queueName, false);
}