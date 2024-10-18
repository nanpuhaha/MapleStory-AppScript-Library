interface UnionInfo {
  date: string;
  union_level: number;
  union_grade: string;
  union_artifact_level: number;
  union_artifact_exp: number;
  union_artifact_point: number;
}

interface UnionRaiderInfo {
  date: string;
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: Array<{
    stat_field_id: string;
    stat_field_effect: string;
  }>;
  union_block: Array<{
    block_type: string;
    block_class: string;
    block_level: string;
    block_control_point: {
      x: number;
      y: number;
    };
    block_position: Array<{
      x: number;
      y: number;
    }> | null;
  }>;
  use_preset_no: number;
  union_raider_preset_1: any; // 상세 타입은 필요에 따라 정의
  union_raider_preset_2: any;
  union_raider_preset_3: any;
  union_raider_preset_4: any;
  union_raider_preset_5: any;
}

interface UnionArtifactInfo {
  date: string;
  union_artifact_effect: Array<{
    name: string;
    level: number;
  }>;
  union_artifact_crystal: Array<{
    name: string;
    validity_flag: string;
    date_expire: string;
    level: number;
    crystal_option_name_1: string;
    crystal_option_name_2: string;
    crystal_option_name_3: string;
  }>;
  union_artifact_remain_ap: number;
}

function getUnionInfo(ocid: string, date?: string): UnionInfo | null {
  const params: QueryParams = { ocid };
  if (date) params.date = date;
  return fetch('/user/union', params);
}

function getUnionRaiderInfo(ocid: string, date?: string): UnionRaiderInfo | null {
  const params: QueryParams = { ocid };
  if (date) params.date = date;
  return fetch('/user/union-raider', params);
}

function getUnionArtifactInfo(ocid: string, date?: string): UnionArtifactInfo | null {
  const params: QueryParams = { ocid };
  if (date) params.date = date;
  return fetch('/user/union-artifact', params);
}

function testUnionFetch() {
  const ocid = "1234567890abcdefghij"; // 실제 OCID로 대체해야 합니다.
  const date = "2024-03-14"; // 선택적 매개변수

  console.log("Union Info:");
  console.log(getUnionInfo(ocid, date));

  console.log("Union Raider Info:");
  console.log(getUnionRaiderInfo(ocid, date));

  console.log("Union Artifact Info:");
  console.log(getUnionArtifactInfo(ocid, date));
}
