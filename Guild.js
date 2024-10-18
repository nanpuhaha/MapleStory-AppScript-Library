/**
 * 길드 식별자(oguild_id) 정보를 조회합니다.
 * @param {string} guildName - 길드 이름
 * @param {string} worldName - 월드 이름
 * @returns {Object} 길드 식별자 정보
 */
function getGuildId(guildName, worldName) {
  const params = {
    guild_name: guildName,
    world_name: worldName,
  };
  return fetch("/guild/id", params);
}

/**
 * 길드의 기본 정보를 조회합니다.
 * @param {string} oguildId - 길드 식별자
 * @param {string} [date] - 조회 기준일 (KST, YYYY-MM-DD)
 * @returns {Object} 길드 기본 정보
 */
function getGuildBasic(oguildId, date) {
  const params = { oguild_id: oguildId };
  if (date) params.date = date;
  return fetch("/guild/basic", params);
}

/**
 * 길드 정보 조회 API를 테스트합니다.
 */
function testGuildFetch() {
  const guildName = "좋은부자";
  const worldName = "엘리시움";

  console.log("길드 ID 조회:");
  const guildIdInfo = getGuildId(guildName, worldName);
  console.log(guildIdInfo);
  /*
  { oguild_id: '604aebb0f9aaaaea871231a0412ec0b3' }
  */

  if (guildIdInfo && guildIdInfo.oguild_id) {
    const oguildId = guildIdInfo.oguild_id;

    console.log("길드 기본 정보 조회:");
    const guildBasicInfo = getGuildBasic(oguildId);
    console.log(guildBasicInfo);
    /*
    { date: null,
      world_name: '엘리시움',
      guild_name: '좋은부자',
      guild_level: 12,
      guild_fame: 1856701,
      guild_point: 407127,
      guild_master_name: '르투이쇼',
      guild_member_count: 47,
      guild_member: 
      [ '먼훗날잊었어',
        '르뽐므나',
        '느뿜니와',
        '름뽐므느',
        '샤르망벨르',
        '르비에벨',
        '샤르망벨',
        '에스뿌아르',
        '쁘띠샤뜨',
        '쁘띠벨르',
        'Jw비숍',
        '우히오히어',
        '라쁘띠베베',
        '예뜨레',
        '좋은부자',
        '르투이쇼',
        '르샹쥬',
        '르샤뜨',
        '우히오히우',
        '먼훗날잊을게',
        '나의소중한님',
        '쿰오표',
        '르레마',
        '르뽕따',
        '맥부자',
        '서퍼가꿈',
        '아델라히',
        '귀농남친',
        '타고난그자식',
        '인생은나무',
        '못난딸',
        '엄마의스매시',
        '미운아들',
        '대랴노',
        '탸요로',
        '디하표',
        '귀농미인',
        '차별인맥',
        '블파용',
        '디삐컬',
        '가생우',
        '키프라',
        '생릭터',
        '불독샹쥬',
        '독우히',
        '맥부자불독',
        '내소중한불독' ],
      guild_skill: 
      [ { skill_name: '길드 정기 지원Ⅰ',
          skill_description: '[마스터 레벨 : 4]\r\n매주 공격력과 마력을 올려주는 길드의 축복과 HP과 MP를 모두 회복시켜 주는 G포션을 지급받을 수 있다.\n지급받은 아이템은 다음 수요일까지 사용 가능',
          skill_level: 3,
          skill_effect: '매주 G포션75개, 길드의 축복 15개 지급',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBMJ.png' },
        { skill_name: '함께라서 덜 아파',
          skill_description: '[마스터 레벨 : 3]\r\n길드원이 받는 피해를 감소시킨다.',
          skill_level: 3,
          skill_effect: '받는 피해 10% 감소',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBOG.png' },
        { skill_name: '길드의 노하우',
          skill_description: '[마스터 레벨 : 1]\r\n길드원이 101레벨 이상 200레벨 이하 일반 몬스터를 사냥할 때 더 많은 경험치를 획득할 수 있다.\n[필요 조건]: 길드 3레벨 이상',
          skill_level: 1,
          skill_effect: '101레벨 이상 200레벨 이하 일반 몬스터 처치 시 획득 경험치 5% 증가',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBOH.png' },
        { skill_name: '길드의 매운 맛Ⅰ',
          skill_description: '[마스터 레벨 : 3]\r\n길드원의 공격력과 마력을 증가시킨다.\n[필요 조건]: 길드 5레벨 이상',
          skill_level: 3,
          skill_effect: '공격력 6, 마력 6 증가',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBOI.png' },
        { skill_name: '졸개들은 물렀거라',
          skill_description: '[마스터 레벨 : 4]\r\n길드원이 일반 몬스터 공격 시 데미지가 증가한다.\n[필요 조건]: 길드 10레벨 이상',
          skill_level: 4,
          skill_effect: '일반 몬스터 공격 시 데미지 12% 증가',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBPD.png' },
        { skill_name: '내 안에 별 있다',
          skill_description: '[마스터 레벨 : 3]\r\n길드원의 스타포스를 증가시킨다.\n[필요 조건]: 길드 5레벨 이상',
          skill_level: 3,
          skill_effect: '스타포스 15 증가',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBPI.png' },
        { skill_name: '너에게 갈게',
          skill_description: '[마스터 레벨 : 3]\r\n같은 채널의 접속중인 지정한 길드원의 위치로 이동한다. 일부 맵에서는 사용이 제한된다.\n[필요 조건]: 길드 5레벨 이상',
          skill_level: 3,
          skill_effect: '지정한 길드원의 위치로 이동, 재사용 대기시간 3시간',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHPBNG.png' } ],
      guild_noblesse_skill: [] }
    */

    // 특정 날짜의 길드 정보 조회 (선택적)
    const specificDate = "2024-03-14";
    console.log(`${specificDate} 기준 길드 기본 정보 조회:`);
    const guildBasicInfoOnDate = getGuildBasic(oguildId, specificDate);
    console.log(guildBasicInfoOnDate);
    /*
    { date: '2024-03-14T00:00+09:00',
      world_name: '엘리시움',
      guild_name: '좋은부자',
      guild_level: 11,
      guild_fame: 1758541,
      guild_point: 377679,
      guild_master_name: '르투이쇼',
      guild_member_count: 47,
      guild_member: 
      [ '먼훗날잊었어',
        '르뽐므나',
        '느뿜니와',
        '름뽐므느',
        '샤르망벨르',
        '르비에벨',
        '샤르망벨',
        '에스뿌아르',
        '쁘띠샤뜨',
        '쁘띠벨르',
        'Jw비숍',
        '우히오히어',
        '라쁘띠베베',
        '예뜨레',
        '좋은부자',
        '르투이쇼',
        '르샹쥬',
        '르샤뜨',
        '우히오히우',
        '먼훗날잊을게',
        '나의소중한님',
        '쿰오표',
        '르레마',
        '르뽕따',
        '맥부자',
        '서퍼가꿈',
        '아델라히',
        '귀농남친',
        '타고난그자식',
        '인생은나무',
        '못난딸',
        '엄마의스매시',
        '미운아들',
        '대랴노',
        '탸요로',
        '디하표',
        '귀농미인',
        '차별인맥',
        '블파용',
        '디삐컬',
        '가생우',
        '키프라',
        '생릭터',
        '불독샹쥬',
        '독우히',
        '맥부자불독',
        '내소중한불독' ],
      guild_skill: 
      [ { skill_name: '길드 정기 지원Ⅰ',
          skill_description: '[마스터 레벨 : 4]\r\n매주 공격력과 마력을 올려주는 길드의 축복과 HP과 MP를 모두 회복시켜 주는 G포션을 지급받을 수 있다.\n지급받은 아이템은 다음 수요일까지 사용 가능',
          skill_level: 3,
          skill_effect: '매주 G포션75개, 길드의 축복 15개 지급',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBMJ.png' },
        { skill_name: '함께라서 덜 아파',
          skill_description: '[마스터 레벨 : 3]\r\n길드원이 받는 피해를 감소시킨다.',
          skill_level: 3,
          skill_effect: '받는 피해 10% 감소',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBOG.png' },
        { skill_name: '길드의 노하우',
          skill_description: '[마스터 레벨 : 1]\r\n길드원이 101레벨 이상 200레벨 이하 일반 몬스터를 사냥할 때 더 많은 경험치를 획득할 수 있다.\n[필요 조건]: 길드 3레벨 이상',
          skill_level: 1,
          skill_effect: '101레벨 이상 200레벨 이하 일반 몬스터 처치 시 획득 경험치 5% 증가',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBOH.png' },
        { skill_name: '길드의 매운 맛Ⅰ',
          skill_description: '[마스터 레벨 : 3]\r\n길드원의 공격력과 마력을 증가시킨다.\n[필요 조건]: 길드 5레벨 이상',
          skill_level: 3,
          skill_effect: '공격력 6, 마력 6 증가',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBOI.png' },
        { skill_name: '졸개들은 물렀거라',
          skill_description: '[마스터 레벨 : 4]\r\n길드원이 일반 몬스터 공격 시 데미지가 증가한다.\n[필요 조건]: 길드 10레벨 이상',
          skill_level: 4,
          skill_effect: '일반 몬스터 공격 시 데미지 12% 증가',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBPD.png' },
        { skill_name: '내 안에 별 있다',
          skill_description: '[마스터 레벨 : 3]\r\n길드원의 스타포스를 증가시킨다.\n[필요 조건]: 길드 5레벨 이상',
          skill_level: 3,
          skill_effect: '스타포스 15 증가',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHOBPI.png' },
        { skill_name: '너에게 갈게',
          skill_description: '[마스터 레벨 : 3]\r\n같은 채널의 접속중인 지정한 길드원의 위치로 이동한다. 일부 맵에서는 사용이 제한된다.\n[필요 조건]: 길드 5레벨 이상',
          skill_level: 3,
          skill_effect: '지정한 길드원의 위치로 이동, 재사용 대기시간 3시간',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHPBNG.png' } ],
      guild_noblesse_skill: 
      [ { skill_name: '크게 한방',
          skill_description: '[마스터 레벨 : 15]\r\n일정 시간 동안 크리티컬 데미지가 일정 비율 증가한다.',
          skill_level: 1,
          skill_effect: '2분 동안 크리티컬 데미지 2% 증가, 재사용 대기시간 60분',
          skill_icon: 'https://open.api.nexon.com/static/maplestory/SkillIcon/KFGDLHPBOF.png' } ] }
    */
  } else {
    console.log("길드 ID를 찾을 수 없습니다.");
  }
}
