import { ServiceDefinition } from 'jimu-core';
import { DataSourceTypes, FeatureLayerDataSource, FeatureServiceDataSource } from '../data-source-interface';
import { AbstractLayerFolderDataSource } from '../ds-base-types';
/**
 * Data source from a feature service, which may contain multiple child data sources.
 */
export declare class FeatureServiceDataSourceImpl extends AbstractLayerFolderDataSource implements FeatureServiceDataSource {
    type: DataSourceTypes.FeatureService;
    fetchServiceDefinition(): Promise<ServiceDefinition>;
    createChildDataSources(): Promise<FeatureLayerDataSource[]>;
    getGDBVersion(): string;
    changeGDBVersion(gdbVersion: string): void;
}
