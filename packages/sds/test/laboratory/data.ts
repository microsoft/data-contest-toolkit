///////////////////////////////////////////////////////////////////////////////
//
// Data for tests in this directory.
//
///////////////////////////////////////////////////////////////////////////////
import {
  IBenchmark,
  ICandidate,
  IRun,
  IRunRequest,
  ISuite,
  RunStatus,
  BenchmarkStageKind,
} from '../../src';

export const serviceURL = 'http://localhost:3000';

export const timestamps = {
  createdAt: new Date('2020-03-19T21:37:31.452Z'),
  updatedAt: new Date('2020-03-20T22:37:31.452Z'),
};

export const benchmark1: IBenchmark = {
  name: 'benchmark1',
  author: 'author1',
  apiVersion: 'v1alpha1',
  stages: [
    {
      // Candidate
      name: 'candidate',
      kind: BenchmarkStageKind.CANDIDATE,
      volumes: [
        {
          name: 'training',
          path: '/input',
          readonly: true,
        },
      ],
    },
    {
      // Benchmark
      name: 'scoring',
      image: 'benchmark-image',
      kind: BenchmarkStageKind.CONTAINER,
      volumes: [
        {
          name: 'reference',
          path: '/reference',
          readonly: true,
        },
      ],
    },
  ],
  ...timestamps,
};

export const benchmark2: IBenchmark = {
  name: 'benchmark2',
  author: 'author2',
  apiVersion: 'v1alpha1',
  stages: [
    {
      // Candidate
      name: 'candidate',
      kind: BenchmarkStageKind.CANDIDATE,
      volumes: [
        {
          name: 'training',
          path: '/input',
          readonly: true,
        },
      ],
    },
    {
      // Benchmark
      name: 'scoring',
      image: 'benchmark-image',
      kind: BenchmarkStageKind.CONTAINER,
      volumes: [
        {
          name: 'reference',
          path: '/reference',
          readonly: true,
        },
      ],
    },
  ],
  ...timestamps,
};

export const benchmark3: IBenchmark = {
  name: 'benchmark3',
  author: 'author3',
  apiVersion: 'v1alpha1',
  stages: [
    {
      // Candidate
      name: 'candidate',
      kind: BenchmarkStageKind.CANDIDATE,
      volumes: [
        {
          name: 'training',
          path: '/input',
          readonly: true,
        },
      ],
    },
    {
      // Benchmark
      name: 'scoring',
      image: 'benchmark-image',
      kind: BenchmarkStageKind.CONTAINER,
      volumes: [
        {
          name: 'reference',
          path: '/reference',
          readonly: true,
        },
      ],
    },
  ],
  ...timestamps,
};

export const benchmark4: IBenchmark = {
  name: 'benchmark4',
  author: 'author4',
  apiVersion: 'v1alpha1',
  stages: [
    {
      name: 'prep',
      kind: BenchmarkStageKind.CONTAINER,
      image: 'benchmark4',
      cmd: [
        '--dataset',
        '{suite.properties.datasetId}',
        '--candidate-files',
        '/data',
        '--resources',
        '/resources',
        '--evaluation-files',
        '/evaluation',
      ],
      env: {
        MODE: 'prep',
        DATASET: '{suite.properties.datasetId}',
      },
      volumes: [
        {
          name: 'candidateData',
          path: '/data',
          readonly: false,
        },
        {
          name: 'resources',
          path: '/resources',
          readonly: false,
        },

        {
          name: 'labels',
          path: '/evaluation',
          readonly: false,
        },
      ],
    },
    {
      name: 'candidate',
      kind: BenchmarkStageKind.CANDIDATE,
      cmd: [
        '--input',
        '/data/input.json',
        '--resources',
        '/resources',
        '--output',
        '/output',
      ],
      env: {
        SDS_RUN: '{run.name}',
      },
      volumes: [
        {
          name: 'candidateData',
          path: '/data',
          readonly: true,
        },
        {
          name: 'resources',
          path: '/resources',
          readonly: true,
        },
        {
          name: 'candidateOutput',
          path: '/output',
          readonly: false,
        },
      ],
    },
    {
      name: 'scoring',
      image: 'benchmark4',
      kind: BenchmarkStageKind.CONTAINER,
      cmd: [
        '--expected',
        '/expected/expected.json',
        '--actual',
        '/actual/actual.json',
        '--resources',
        '/resources',
        '--laboratory',
        '{laboratoryEndpoint}',
        '--run',
        '{run.name}',
      ],
      env: {
        MODE: 'evaluation',
      },
      volumes: [
        {
          name: 'candidateOutput',
          path: '/actual',
          readonly: true,
        },
        {
          name: 'labels',
          path: '/expected',
          readonly: true,
        },
        {
          name: 'resources',
          path: '/resources',
          readonly: true,
        },
      ],
    },
  ],
  ...timestamps,
};

export const candidate1: ICandidate = {
  name: 'candidate1',
  author: 'author1',
  apiVersion: 'v1alpha1',
  benchmark: 'benchmark1',
  image: 'candidate1-image',
  ...timestamps,
};

export const candidate2: ICandidate = {
  name: 'candidate2',
  author: 'author2',
  apiVersion: 'v1alpha1',
  benchmark: 'benchmark1',
  image: 'candidate2-image',
  ...timestamps,
};

export const candidate3: ICandidate = {
  name: 'candidate3',
  author: 'author3',
  apiVersion: 'v1alpha1',
  benchmark: 'benchmark1',
  image: 'candidate3-image',
  ...timestamps,
};

export const candidate4: ICandidate = {
  name: 'candidate4',
  author: 'author4',
  apiVersion: 'v1alpha1',
  benchmark: 'benchmark4',
  image: 'candidate4-image',
  env: {
    LOG_LEVEL: 'debug',
  },
  ...timestamps,
};

export const suite1: ISuite = {
  name: 'suite1',
  author: 'author1',
  apiVersion: 'v1alpha1',
  benchmark: 'benchmark1',
  properties: {
    datasetId: '00000000-0000-0000-0000-000000000000',
  },
  volumes: [
    {
      name: 'training',
      type: 'AzureBlob',
      target: 'https://sample.blob.core.windows.net/training',
    },
    {
      name: 'reference',
      type: 'AzureBlob',
      target: 'https://sample.blob.core.windows.net/reference',
    },
  ],
  ...timestamps,
};

export const suite2: ISuite = {
  name: 'suite2',
  author: 'author2',
  apiVersion: 'v1alpha1',
  benchmark: 'benchmark1',
  volumes: [
    {
      name: 'training',
      type: 'AzureBlob',
      target: 'https://sample.blob.core.windows.net/training',
    },
    {
      name: 'reference',
      type: 'AzureBlob',
      target: 'https://sample.blob.core.windows.net/reference',
    },
  ],
  ...timestamps,
};

export const suite3: ISuite = {
  name: 'suite3',
  author: 'author3',
  apiVersion: 'v1alpha1',
  benchmark: 'benchmark1',
  volumes: [
    {
      name: 'training',
      type: 'AzureBlob',
      target: 'https://sample.blob.core.windows.net/training',
    },
    {
      name: 'reference',
      type: 'AzureBlob',
      target: 'https://sample.blob.core.windows.net/reference',
    },
  ],
  ...timestamps,
};

export const suite4: ISuite = {
  name: 'suite4',
  author: 'author4',
  apiVersion: 'v1alpha1',
  benchmark: 'benchmark4',
  properties: {
    datasetId: '00000000-0000-0000-0000-000000000000',
  },
  volumes: [
    {
      name: 'candidateData',
      type: 'ephemeral',
    },
    {
      name: 'resources',
      type: 'ephemeral',
    },
    {
      name: 'labels',
      type: 'ephemeral',
    },
    {
      name: 'candidateOutput',
      type: 'ephemeral',
    },
  ],
  ...timestamps,
};

export const runRequest1: IRunRequest = {
  candidate: 'candidate1',
  suite: 'suite1',
};

const runid = '69bd5df9-48a2-4fd0-81c5-0a7d6932eef2';
export const run1: IRun = {
  name: runid,
  author: 'author1',
  apiVersion: 'v1alpha1',
  benchmark: benchmark1,
  candidate: candidate1,
  suite: suite1,
  status: RunStatus.CREATED,
  ...timestamps,
};
