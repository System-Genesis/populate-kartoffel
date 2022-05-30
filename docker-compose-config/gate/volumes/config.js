"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const env = __importStar(require("env-var"));
require("./dotenv");
const DATA_SOURCE = [
    'dataSource1',
    'dataSource2',
    'aka',
    'es_name',
    'ads_name',
    'adNN_name',
    'nvSQL_name',
    'lmn_name',
    'mdn_name',
    'mm_name',
    'city_name',
];
const sensitiveDataSource = DATA_SOURCE[0];
const sensitive2DataSource = DATA_SOURCE[1];
const sensitive2HierarchyCondition = {
    method: 'hierarchyCondition',
    field: 'hierarchy',
    value: `root/sensitive2`,
};
const config = {
    web: {
        port: env.get('PORT').required().asPortNumber(),
        isAuth: env.get('IS_AUTH').required().asBool(),
        requiredScopes: ['write', 'read'],
        services: {
            elastic: env.get('ELASTIC_SERVICE').required().asString(),
            read: env.get('READ_SERVICE').required().asString(),
            write: env.get('WRITE_SERVICE').required().asString(),
        },
    },
    entitiesType: {
        role: 'role',
        entity: 'entity',
        digitalIdentity: 'digitalIdentity',
    },
    rules: {
        filters: {
            entity: [
                {
                    name: 'hideSensitivePersons',
                    field: 'hierarchy',
                    values: [`root/sensitive`, `granpa/son`],
                },
                {
                    name: 'sourceFilter',
                    field: 'source',
                    values: [`city_name`],
                },
            ],
            group: [
                {
                    name: 'hideSensitivePersons',
                    field: 'source',
                    values: [`root/sensitive`, `granpa/son`],
                },
            ],
            digitalIdentity: [],
            role: [],
            organizationGroup: [],
        },
        transformers: {
            entity: [
                {
                    name: 'removeSensitiveDomainUsers',
                    method: 'arrayFilter',
                    targetField: 'domainUsers',
                    conditions: [
                        {
                            method: 'simpleValueCondition',
                            field: 'dataSource',
                            value: `${sensitiveDataSource}`,
                        },
                    ],
                },
                {
                    name: 'removeHierarchy',
                    method: 'fieldExclude',
                    targetField: 'hierarchy',
                    conditions: [
                        {
                            method: 'simpleValueCondition',
                            field: 'firstName',
                            value: `Myrony`,
                        },
                    ],
                },
                {
                    name: 'removeSensitive2DomainUsersHierarchy',
                    method: 'arrayMapper',
                    targetField: 'domainUsers',
                    transformer: {
                        method: 'fieldExclude',
                        targetField: 'hierarchy',
                        conditions: [
                            {
                                method: 'simpleValueCondition',
                                field: 'dataSource',
                                value: `${sensitive2DataSource}`,
                            },
                        ],
                    },
                },
                {
                    name: 'removeSensitive2Hierarchy',
                    method: 'fieldExclude',
                    targetField: 'hierarchy',
                    conditions: [sensitive2HierarchyCondition],
                },
                {
                    name: 'removeSensitive2DirectGroup',
                    method: 'fieldExclude',
                    targetField: 'directGroup',
                    conditions: [sensitive2HierarchyCondition],
                },
                {
                    name: 'removeSex',
                    method: 'fieldExclude',
                    targetField: 'sex',
                    conditions: [
                        {
                            method: 'startsWithCondition',
                            field: 'hierarchy',
                            value: 'es_name',
                        },
                    ],
                },
            ],
            group: [],
            digitalIdentity: [
                {
                    name: 'removeEntityId',
                    method: 'fieldExclude',
                    targetField: 'entityId',
                    conditions: [
                        {
                            method: 'simpleValueCondition',
                            field: 'source',
                            value: 'city_name',
                        },
                    ],
                },
            ],
            role: [
                {
                    name: 'jobTitle',
                    method: 'fieldExclude',
                    targetField: 'jobTitle',
                    conditions: [
                        {
                            method: 'startsWithCondition',
                            field: 'hierarchy',
                            value: 'wallmart',
                        },
                    ],
                },
            ],
            organizationGroup: [],
        },
    },
    scopes: {
        externalScope: ['sourceFilter', 'removeSex', 'removeEntityId', 'jobTitle'],
    },
};
exports.default = config;
//# sourceMappingURL=index.js.map