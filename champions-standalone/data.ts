export type Position = 'GK' | 'DEF' | 'MID' | 'ATK'

export interface PlayerStats {
  pac: number
  sho: number
  pas: number
  def: number
}

export interface CLPlayer {
  id: string
  name: string
  position: Position
  nationality: string
  flag: string
  stats: PlayerStats
  isLegend?: boolean
}

export interface CLClub {
  id: string
  name: string
  shortName: string
  season: string
  country: string
  flag: string
  primaryColor: string
  secondaryColor: string
  players: CLPlayer[]
}

export interface CLEdition {
  season: string
  year: number
  winner: string
  clubs: CLClub[]
}

const p = (
  id: string, name: string, pos: Position, nat: string, flag: string,
  pac: number, sho: number, pas: number, def: number, legend = false
): CLPlayer => ({ id, name, position: pos, nationality: nat, flag, stats: { pac, sho, pas, def }, isLegend: legend })

export const CL_EDITIONS: CLEdition[] = [
  {
    season: '1959-60', year: 1960, winner: 'Real Madrid',
    clubs: [
      {
        id: 'rm-1960', name: 'Real Madrid', shortName: 'Madrid', season: '1959-60',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#FFFFFF', secondaryColor: '#003DA5',
        players: [
          p('rm60-1','Rogelio Domínguez','GK','Spain','🇪🇸',52,28,52,80),
          p('rm60-2','Marquitos','DEF','Spain','🇪🇸',68,44,58,82),
          p('rm60-3','José Santamaría','DEF','Uruguay','🇺🇾',64,40,60,85),
          p('rm60-4','Pachin','DEF','Spain','🇪🇸',66,42,60,78),
          p('rm60-5','Zarraga','MID','Spain','🇪🇸',64,62,74,65),
          p('rm60-6','Luis Del Sol','MID','Spain','🇪🇸',72,70,76,60),
          p('rm60-7','Enrique Mateos','MID','Spain','🇪🇸',70,68,70,55),
          p('rm60-8','Francisco Gento','ATK','Spain','🇪🇸',96,82,78,32,true),
          p('rm60-9','Alfredo Di Stéfano','ATK','Argentina','🇦🇷',82,90,93,68,true),
          p('rm60-10','Ferenc Puskás','ATK','Hungary','🇭🇺',74,96,86,38,true),
          p('rm60-11','Rafael Moreno','ATK','Spain','🇪🇸',76,78,70,36),
        ]
      },
      {
        id: 'eintr-1960', name: 'Eintracht Frankfurt', shortName: 'Frankfurt', season: '1959-60',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#E1001A', secondaryColor: '#000000',
        players: [
          p('ef60-1','Egon Loy','GK','Germany','🇩🇪',55,30,52,78),
          p('ef60-2','Friedrich Lutz','DEF','Germany','🇩🇪',65,42,55,76),
          p('ef60-3','Walter Höfer','DEF','Germany','🇩🇪',62,40,55,74),
          p('ef60-4','Hans-Walter Eigenbrodt','DEF','Germany','🇩🇪',63,40,54,75),
          p('ef60-5','Alfred Pfaff','MID','Germany','🇩🇪',70,72,76,58),
          p('ef60-6','Richard Kress','MID','Germany','🇩🇪',72,70,74,55),
          p('ef60-7','Dieter Lindner','MID','Germany','🇩🇪',68,65,70,54),
          p('ef60-8','Erwin Stein','ATK','Germany','🇩🇪',76,80,70,35),
          p('ef60-9','Erich Mehl','ATK','Germany','🇩🇪',72,74,66,32),
          p('ef60-10','Hans Weilbächer','ATK','Germany','🇩🇪',70,72,65,30),
        ]
      },
    ]
  },
  {
    season: '1961-62', year: 1962, winner: 'Benfica',
    clubs: [
      {
        id: 'ben-1962', name: 'Benfica', shortName: 'Benfica', season: '1961-62',
        country: 'Portugal', flag: '🇵🇹', primaryColor: '#E4002B', secondaryColor: '#F5A623',
        players: [
          p('ben62-1','Alberto da Costa Pereira','GK','Portugal','🇵🇹',55,30,54,84),
          p('ben62-2','Germano','DEF','Portugal','🇵🇹',66,42,58,82),
          p('ben62-3','Cruz','DEF','Portugal','🇵🇹',64,40,56,78),
          p('ben62-4','Cavém','DEF','Portugal','🇵🇹',65,40,55,76),
          p('ben62-5','Mário Coluna','MID','Mozambique','🇲🇿',72,74,80,65,true),
          p('ben62-6','José Augusto','MID','Portugal','🇵🇹',74,72,76,58),
          p('ben62-7','Fernando Cruz','MID','Portugal','🇵🇹',68,65,72,62),
          p('ben62-8','Eusébio','ATK','Mozambique','🇲🇿',88,94,80,48,true),
          p('ben62-9','José Águas','ATK','Portugal','🇵🇹',78,82,72,38),
          p('ben62-10','Joaquim Santana','ATK','Portugal','🇵🇹',76,78,70,34),
        ]
      },
      {
        id: 'rm-1962', name: 'Real Madrid', shortName: 'Madrid', season: '1961-62',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#FFFFFF', secondaryColor: '#003DA5',
        players: [
          p('rm62-1','Araquistáin','GK','Spain','🇪🇸',52,28,50,78),
          p('rm62-2','Marquitos','DEF','Spain','🇪🇸',66,42,58,80),
          p('rm62-3','José Santamaría','DEF','Uruguay','🇺🇾',62,38,58,84),
          p('rm62-4','Pachin','DEF','Spain','🇪🇸',64,40,58,76),
          p('rm62-5','Vidal','MID','Spain','🇪🇸',62,60,70,60),
          p('rm62-6','Félix Ruiz','MID','Spain','🇪🇸',66,64,72,58),
          p('rm62-7','Luis Del Sol','MID','Spain','🇪🇸',70,68,74,58),
          p('rm62-8','Francisco Gento','ATK','Spain','🇪🇸',94,80,76,32,true),
          p('rm62-9','Alfredo Di Stéfano','ATK','Argentina','🇦🇷',80,88,91,66,true),
          p('rm62-10','Ferenc Puskás','ATK','Hungary','🇭🇺',72,94,84,36,true),
        ]
      },
    ]
  },
  {
    season: '1966-67', year: 1967, winner: 'Celtic',
    clubs: [
      {
        id: 'cel-1967', name: 'Celtic', shortName: 'Celtic', season: '1966-67',
        country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', primaryColor: '#1B7C3D', secondaryColor: '#FFFFFF',
        players: [
          p('cel67-1','Ronnie Simpson','GK','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',55,30,54,80),
          p('cel67-2','Tommy Gemmell','DEF','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',76,74,68,75),
          p('cel67-3','Billy McNeill','DEF','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',66,50,62,84),
          p('cel67-4','John Clark','DEF','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',64,42,60,80),
          p('cel67-5','Jim Craig','DEF','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',72,50,65,76),
          p('cel67-6','Bobby Murdoch','MID','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',68,72,78,65),
          p('cel67-7','Bertie Auld','MID','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',70,68,76,62),
          p('cel67-8','Jimmy Johnstone','ATK','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',90,78,80,35,true),
          p('cel67-9','Stevie Chalmers','ATK','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',82,80,72,36),
          p('cel67-10','Willie Wallace','ATK','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',80,78,70,34),
          p('cel67-11','Bobby Lennox','ATK','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',88,76,72,32),
        ]
      },
      {
        id: 'inter-1967', name: 'Inter Milan', shortName: 'Inter', season: '1966-67',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#010E80', secondaryColor: '#000000',
        players: [
          p('int67-1','Giuliano Sarti','GK','Italy','🇮🇹',54,28,52,84),
          p('int67-2','Tarcisio Burgnich','DEF','Italy','🇮🇹',70,46,60,84),
          p('int67-3','Giacinto Facchetti','DEF','Italy','🇮🇹',82,68,72,80,true),
          p('int67-4','Armando Picchi','DEF','Italy','🇮🇹',64,42,58,82),
          p('int67-5','Aristide Guarneri','DEF','Italy','🇮🇹',62,38,56,80),
          p('int67-6','Sandro Mazzola','MID','Italy','🇮🇹',78,80,82,60,true),
          p('int67-7','Luis Suárez','MID','Spain','🇪🇸',72,70,85,62,true),
          p('int67-8','Jair','MID','Brazil','🇧🇷',82,74,72,50),
          p('int67-9','Mario Corso','ATK','Italy','🇮🇹',80,76,80,36),
          p('int67-10','Angelo Domenghini','ATK','Italy','🇮🇹',78,74,70,34),
        ]
      },
    ]
  },
  {
    season: '1967-68', year: 1968, winner: 'Manchester United',
    clubs: [
      {
        id: 'manu-1968', name: 'Manchester United', shortName: 'Man United', season: '1967-68',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#DA291C', secondaryColor: '#FFE500',
        players: [
          p('mu68-1','Alex Stepney','GK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',56,30,52,82),
          p('mu68-2','Shay Brennan','DEF','Ireland','🇮🇪',68,44,60,76),
          p('mu68-3','Bill Foulkes','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',64,38,56,82),
          p('mu68-4','Tony Dunne','DEF','Ireland','🇮🇪',72,46,62,78),
          p('mu68-5','Nobby Stiles','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',68,60,68,78),
          p('mu68-6','Pat Crerand','MID','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',66,62,76,70),
          p('mu68-7','Bobby Charlton','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',72,84,86,68,true),
          p('mu68-8','George Best','ATK','N.Ireland','🇬🇧',96,88,84,40,true),
          p('mu68-9','Denis Law','ATK','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',86,90,80,42,true),
          p('mu68-10','Brian Kidd','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',80,78,70,36),
          p('mu68-11','John Aston','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',88,76,72,32),
        ]
      },
      {
        id: 'ben-1968', name: 'Benfica', shortName: 'Benfica', season: '1967-68',
        country: 'Portugal', flag: '🇵🇹', primaryColor: '#E4002B', secondaryColor: '#F5A623',
        players: [
          p('ben68-1','José Henrique','GK','Portugal','🇵🇹',55,28,52,82),
          p('ben68-2','Jacinto','DEF','Portugal','🇵🇹',64,40,56,78),
          p('ben68-3','Cruz','DEF','Portugal','🇵🇹',62,38,54,76),
          p('ben68-4','Humberto','DEF','Portugal','🇵🇹',64,40,58,78),
          p('ben68-5','Mário Coluna','MID','Mozambique','🇲🇿',70,70,80,62,true),
          p('ben68-6','Graça','MID','Portugal','🇵🇹',68,65,72,58),
          p('ben68-7','Simões','MID','Portugal','🇵🇹',70,68,74,56),
          p('ben68-8','Eusébio','ATK','Mozambique','🇲🇿',86,92,78,46,true),
          p('ben68-9','Torres','ATK','Portugal','🇵🇹',76,78,68,38),
          p('ben68-10','Fernando Cruz','ATK','Portugal','🇵🇹',74,74,66,34),
        ]
      },
    ]
  },
  {
    season: '1972-73', year: 1973, winner: 'Ajax',
    clubs: [
      {
        id: 'ajax-1973', name: 'Ajax', shortName: 'Ajax', season: '1972-73',
        country: 'Netherlands', flag: '🇳🇱', primaryColor: '#CC0000', secondaryColor: '#FFFFFF',
        players: [
          p('aj73-1','Heinz Stuy','GK','Netherlands','🇳🇱',56,28,54,82),
          p('aj73-2','Ruud Krol','DEF','Netherlands','🇳🇱',78,60,74,80,true),
          p('aj73-3','Barry Hulshoff','DEF','Netherlands','🇳🇱',66,44,62,80),
          p('aj73-4','Horst Blankenburg','DEF','Germany','🇩🇪',64,42,60,78),
          p('aj73-5','Johan Neeskens','MID','Netherlands','🇳🇱',82,78,82,75,true),
          p('aj73-6','Arie Haan','MID','Netherlands','🇳🇱',76,76,78,68),
          p('aj73-7','Gerrie Mühren','MID','Netherlands','🇳🇱',72,70,80,62),
          p('aj73-8','Johan Cruyff','ATK','Netherlands','🇳🇱',94,86,90,52,true),
          p('aj73-9','Johnny Rep','ATK','Netherlands','🇳🇱',88,82,76,36),
          p('aj73-10','Piet Keizer','ATK','Netherlands','🇳🇱',86,78,74,34),
          p('aj73-11','Dick van Dijk','ATK','Netherlands','🇳🇱',78,76,68,34),
        ]
      },
      {
        id: 'juve-1973', name: 'Juventus', shortName: 'Juventus', season: '1972-73',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#000000', secondaryColor: '#FFFFFF',
        players: [
          p('jv73-1','Dino Zoff','GK','Italy','🇮🇹',58,28,56,92,true),
          p('jv73-2','Luciano Spinosi','DEF','Italy','🇮🇹',70,46,60,78),
          p('jv73-3','Francesco Morini','DEF','Italy','🇮🇹',64,40,58,80),
          p('jv73-4','Giuseppe Furino','DEF','Italy','🇮🇹',66,44,62,78),
          p('jv73-5','Fabio Capello','MID','Italy','🇮🇹',72,74,76,64,true),
          p('jv73-6','Franco Causio','MID','Italy','🇮🇹',80,72,78,58),
          p('jv73-7','Pietro Anastasi','ATK','Italy','🇮🇹',78,80,70,36),
          p('jv73-8','Roberto Bettega','ATK','Italy','🇮🇹',76,80,72,34),
          p('jv73-9','Helmut Haller','ATK','Germany','🇩🇪',74,76,76,38),
        ]
      },
    ]
  },
  {
    season: '1975-76', year: 1976, winner: 'Bayern Munich',
    clubs: [
      {
        id: 'bay-1976', name: 'Bayern Munich', shortName: 'Bayern', season: '1975-76',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#DC052D', secondaryColor: '#0066B2',
        players: [
          p('bay76-1','Sepp Maier','GK','Germany','🇩🇪',60,30,55,90,true),
          p('bay76-2','Franz Beckenbauer','DEF','Germany','🇩🇪',82,74,86,88,true),
          p('bay76-3','Georg Schwarzenbeck','DEF','Germany','🇩🇪',68,46,62,84),
          p('bay76-4','Hans-Georg Dürnberger','DEF','Germany','🇩🇪',70,48,62,78),
          p('bay76-5','Rainer Zobel','MID','Germany','🇩🇪',72,65,72,70),
          p('bay76-6','Uli Hoeness','MID','Germany','🇩🇪',82,78,76,60,true),
          p('bay76-7','Franz Roth','MID','Germany','🇩🇪',74,68,72,66),
          p('bay76-8','Karl-Heinz Rummenigge','ATK','Germany','🇩🇪',88,84,76,40,true),
          p('bay76-9','Gerd Müller','ATK','Germany','🇩🇪',72,96,72,38,true),
          p('bay76-10','Conny Torstensson','ATK','Sweden','🇸🇪',82,78,72,34),
        ]
      },
      {
        id: 'asse-1976', name: 'AS Saint-Étienne', shortName: 'Saint-Étienne', season: '1975-76',
        country: 'France', flag: '🇫🇷', primaryColor: '#1B5E20', secondaryColor: '#FFFFFF',
        players: [
          p('asse76-1','Ivan Ćurković','GK','Yugoslavia','🇷🇸',56,28,52,82),
          p('asse76-2','Gérard Janvion','DEF','France','🇫🇷',70,44,60,76),
          p('asse76-3','Christian Lopez','DEF','France','🇫🇷',66,40,58,78),
          p('asse76-4','Osvaldo Piazza','DEF','Argentina','🇦🇷',68,44,60,80),
          p('asse76-5','Dominique Rocheteau','MID','France','🇫🇷',86,78,78,52),
          p('asse76-6','Jean-Michel Larqué','MID','France','🇫🇷',70,68,76,60),
          p('asse76-7','Hervé Revelli','ATK','France','🇫🇷',80,80,72,36),
          p('asse76-8','Patrick Revelli','ATK','France','🇫🇷',76,74,68,34),
        ]
      },
    ]
  },
  {
    season: '1983-84', year: 1984, winner: 'Liverpool',
    clubs: [
      {
        id: 'liv-1984', name: 'Liverpool', shortName: 'Liverpool', season: '1983-84',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#C8102E', secondaryColor: '#F6EB61',
        players: [
          p('liv84-1','Bruce Grobbelaar','GK','Zimbabwe','🇿🇼',60,30,55,84),
          p('liv84-2','Phil Neal','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',72,64,68,80),
          p('liv84-3','Alan Hansen','DEF','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',70,46,70,86,true),
          p('liv84-4','Mark Lawrenson','DEF','Ireland','🇮🇪',72,48,68,84),
          p('liv84-5','Alan Kennedy','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',74,56,64,78),
          p('liv84-6','Graeme Souness','MID','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',76,76,82,78,true),
          p('liv84-7','Sammy Lee','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',72,66,74,70),
          p('liv84-8','Terry McDermott','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',74,72,74,64),
          p('liv84-9','Kenny Dalglish','ATK','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',78,84,88,52,true),
          p('liv84-10','Ian Rush','ATK','Wales','🏴󠁧󠁢󠁷󠁬󠁳󠁿',88,90,74,38,true),
          p('liv84-11','Craig Johnston','ATK','Australia','🇦🇺',82,74,72,36),
        ]
      },
      {
        id: 'roma-1984', name: 'AS Roma', shortName: 'Roma', season: '1983-84',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#8E1F2F', secondaryColor: '#F5C400',
        players: [
          p('roma84-1','Franco Tancredi','GK','Italy','🇮🇹',55,28,52,82),
          p('roma84-2','Odoacre Chierico','DEF','Italy','🇮🇹',66,42,58,76),
          p('roma84-3','Sebastiano Nela','DEF','Italy','🇮🇹',70,48,62,78),
          p('roma84-4','Ubaldo Righetti','DEF','Italy','🇮🇹',68,44,60,78),
          p('roma84-5','Carlo Ancelotti','MID','Italy','🇮🇹',70,68,84,66,true),
          p('roma84-6','Paulo Roberto Falcão','MID','Brazil','🇧🇷',76,78,88,68,true),
          p('roma84-7','Agostino Di Bartolomei','MID','Italy','🇮🇹',68,70,80,65),
          p('roma84-8','Roberto Pruzzo','ATK','Italy','🇮🇹',74,82,70,36),
          p('roma84-9','Bruno Conti','ATK','Italy','🇮🇹',84,78,78,38,true),
          p('roma84-10','Francesco Graziani','ATK','Italy','🇮🇹',76,78,70,34),
        ]
      },
    ]
  },
  {
    season: '1988-89', year: 1989, winner: 'AC Milan',
    clubs: [
      {
        id: 'acm-1989', name: 'AC Milan', shortName: 'Milan', season: '1988-89',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#FB090B', secondaryColor: '#000000',
        players: [
          p('acm89-1','Giovanni Galli','GK','Italy','🇮🇹',56,28,52,84),
          p('acm89-2','Paolo Maldini','DEF','Italy','🇮🇹',82,60,76,92,true),
          p('acm89-3','Alessandro Costacurta','DEF','Italy','🇮🇹',72,44,66,88,true),
          p('acm89-4','Filippo Galli','DEF','Italy','🇮🇹',66,42,58,82),
          p('acm89-5','Mauro Tassotti','DEF','Italy','🇮🇹',68,46,62,82),
          p('acm89-6','Carlo Ancelotti','MID','Italy','🇮🇹',68,66,84,64),
          p('acm89-7','Frank Rijkaard','MID','Netherlands','🇳🇱',78,72,80,80,true),
          p('acm89-8','Evani','MID','Italy','🇮🇹',74,70,76,62),
          p('acm89-9','Roberto Donadoni','MID','Italy','🇮🇹',76,70,78,68),
          p('acm89-10','Ruud Gullit','ATK','Netherlands','🇳🇱',88,86,84,56,true),
          p('acm89-11','Marco van Basten','ATK','Netherlands','🇳🇱',82,96,80,44,true),
        ]
      },
      {
        id: 'stea-1989', name: 'Steaua Bucharest', shortName: 'Steaua', season: '1988-89',
        country: 'Romania', flag: '🇷🇴', primaryColor: '#CC0000', secondaryColor: '#003DA5',
        players: [
          p('stea89-1','Silviu Lung','GK','Romania','🇷🇴',54,28,50,80),
          p('stea89-2','Miodrag Belodedici','DEF','Yugoslavia','🇷🇸',70,46,62,82),
          p('stea89-3','Gheorghe Iordănescu','DEF','Romania','🇷🇴',64,40,58,78),
          p('stea89-4','Ioan Andone','DEF','Romania','🇷🇴',66,42,58,76),
          p('stea89-5','Ilie Balaci','MID','Romania','🇷🇴',70,68,74,60),
          p('stea89-6','Marius Lăcătuș','MID','Romania','🇷🇴',82,76,74,54),
          p('stea89-7','Hagi','MID','Romania','🇷🇴',78,82,86,52,true),
          p('stea89-8','Victor Pițurcă','ATK','Romania','🇷🇴',80,78,70,36),
          p('stea89-9','Rodion Cămătaru','ATK','Romania','🇷🇴',76,78,68,34),
        ]
      },
    ]
  },
  {
    season: '1991-92', year: 1992, winner: 'Barcelona',
    clubs: [
      {
        id: 'bar-1992', name: 'Barcelona', shortName: 'Barcelona', season: '1991-92',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#A50044', secondaryColor: '#004D98',
        players: [
          p('bar92-1','Andoni Zubizarreta','GK','Spain','🇪🇸',58,28,55,86),
          p('bar92-2','Ronald Koeman','DEF','Netherlands','🇳🇱',72,82,82,84,true),
          p('bar92-3','Julio Alberto','DEF','Spain','🇪🇸',68,46,60,78),
          p('bar92-4','Albert Ferrer','DEF','Spain','🇪🇸',74,50,66,76),
          p('bar92-5','Juan Carlos','DEF','Spain','🇪🇸',66,44,62,76),
          p('bar92-6','Pep Guardiola','MID','Spain','🇪🇸',68,62,88,72,true),
          p('bar92-7','Michael Laudrup','MID','Denmark','🇩🇰',84,76,90,54,true),
          p('bar92-8','Txiki Begiristain','MID','Spain','🇪🇸',82,76,78,52),
          p('bar92-9','Hristo Stoichkov','ATK','Bulgaria','🇧🇬',88,88,78,44,true),
          p('bar92-10','Julio Salinas','ATK','Spain','🇪🇸',80,80,72,36),
          p('bar92-11','José Bakero','ATK','Spain','🇪🇸',76,74,76,44),
        ]
      },
      {
        id: 'samp-1992', name: 'Sampdoria', shortName: 'Sampdoria', season: '1991-92',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#003DA5', secondaryColor: '#CC0000',
        players: [
          p('samp92-1','Gianluca Pagliuca','GK','Italy','🇮🇹',58,28,54,84),
          p('samp92-2','Pietro Vierchowod','DEF','Italy','🇮🇹',68,44,58,84),
          p('samp92-3','Moreno Mannini','DEF','Italy','🇮🇹',70,46,60,78),
          p('samp92-4','Marco Lanna','DEF','Italy','🇮🇹',66,42,58,76),
          p('samp92-5','Toninho Cerezo','MID','Brazil','🇧🇷',70,68,80,68),
          p('samp92-6','Attilio Lombardo','MID','Italy','🇮🇹',78,70,74,60),
          p('samp92-7','Vladimir Jugović','MID','Yugoslavia','🇷🇸',74,70,76,62),
          p('samp92-8','Gianluca Vialli','ATK','Italy','🇮🇹',84,86,76,40,true),
          p('samp92-9','Roberto Mancini','ATK','Italy','🇮🇹',80,80,82,42,true),
          p('samp92-10','Srećko Katanec','ATK','Yugoslavia','🇷🇸',76,74,72,40),
        ]
      },
    ]
  },
  {
    season: '1993-94', year: 1994, winner: 'AC Milan',
    clubs: [
      {
        id: 'acm-1994', name: 'AC Milan', shortName: 'Milan', season: '1993-94',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#FB090B', secondaryColor: '#000000',
        players: [
          p('acm94-1','Sebastiano Rossi','GK','Italy','🇮🇹',56,28,52,84),
          p('acm94-2','Paolo Maldini','DEF','Italy','🇮🇹',84,62,80,94,true),
          p('acm94-3','Franco Baresi','DEF','Italy','🇮🇹',74,52,78,94,true),
          p('acm94-4','Alessandro Costacurta','DEF','Italy','🇮🇹',72,44,68,90),
          p('acm94-5','Mauro Tassotti','DEF','Italy','🇮🇹',68,46,62,84),
          p('acm94-6','Marcel Desailly','MID','France','🇫🇷',78,66,76,88,true),
          p('acm94-7','Zvonimir Boban','MID','Croatia','🇭🇷',76,74,82,72,true),
          p('acm94-8','Demetrio Albertini','MID','Italy','🇮🇹',66,62,82,64),
          p('acm94-9','Dejan Savićević','ATK','Yugoslavia','🇷🇸',86,88,84,42,true),
          p('acm94-10','Daniele Massaro','ATK','Italy','🇮🇹',80,82,72,38),
          p('acm94-11','Roberto Donadoni','MID','Italy','🇮🇹',74,70,76,68),
        ]
      },
      {
        id: 'bar-1994', name: 'Barcelona', shortName: 'Barcelona', season: '1993-94',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#A50044', secondaryColor: '#004D98',
        players: [
          p('bar94-1','Andoni Zubizarreta','GK','Spain','🇪🇸',56,28,54,84),
          p('bar94-2','Ronald Koeman','DEF','Netherlands','🇳🇱',70,80,80,82),
          p('bar94-3','Albert Ferrer','DEF','Spain','🇪🇸',72,48,64,76),
          p('bar94-4','Miguel Ángel Nadal','DEF','Spain','🇪🇸',70,52,62,80),
          p('bar94-5','Pep Guardiola','MID','Spain','🇪🇸',66,60,88,70),
          p('bar94-6','Michael Laudrup','MID','Denmark','🇩🇰',82,74,92,52,true),
          p('bar94-7','Txiki Begiristain','MID','Spain','🇪🇸',80,74,76,50),
          p('bar94-8','Hristo Stoichkov','ATK','Bulgaria','🇧🇬',86,88,78,42,true),
          p('bar94-9','Romário','ATK','Brazil','🇧🇷',78,92,76,36,true),
          p('bar94-10','Julio Salinas','ATK','Spain','🇪🇸',78,78,70,34),
        ]
      },
    ]
  },
  {
    season: '1994-95', year: 1995, winner: 'Ajax',
    clubs: [
      {
        id: 'ajax-1995', name: 'Ajax', shortName: 'Ajax', season: '1994-95',
        country: 'Netherlands', flag: '🇳🇱', primaryColor: '#CC0000', secondaryColor: '#FFFFFF',
        players: [
          p('aj95-1','Edwin van der Sar','GK','Netherlands','🇳🇱',60,28,58,88,true),
          p('aj95-2','Michael Reiziger','DEF','Netherlands','🇳🇱',80,54,70,80),
          p('aj95-3','Frank de Boer','DEF','Netherlands','🇳🇱',72,56,76,82,true),
          p('aj95-4','Danny Blind','DEF','Netherlands','🇳🇱',68,44,68,80),
          p('aj95-5','Edgar Davids','MID','Netherlands','🇳🇱',82,72,76,78,true),
          p('aj95-6','Clarence Seedorf','MID','Netherlands','🇳🇱',82,78,82,66,true),
          p('aj95-7','Jari Litmanen','MID','Finland','🇫🇮',80,82,86,58,true),
          p('aj95-8','Ronald de Boer','ATK','Netherlands','🇳🇱',80,76,80,54),
          p('aj95-9','Marc Overmars','ATK','Netherlands','🇳🇱',94,80,78,38,true),
          p('aj95-10','Patrick Kluivert','ATK','Netherlands','🇳🇱',88,86,74,40,true),
          p('aj95-11','Finidi George','ATK','Nigeria','🇳🇬',88,80,74,34),
        ]
      },
      {
        id: 'acm-1995', name: 'AC Milan', shortName: 'Milan', season: '1994-95',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#FB090B', secondaryColor: '#000000',
        players: [
          p('acm95-1','Sebastiano Rossi','GK','Italy','🇮🇹',54,26,50,84),
          p('acm95-2','Paolo Maldini','DEF','Italy','🇮🇹',84,60,80,94,true),
          p('acm95-3','Franco Baresi','DEF','Italy','🇮🇹',72,50,76,92,true),
          p('acm95-4','Alessandro Costacurta','DEF','Italy','🇮🇹',70,42,66,88),
          p('acm95-5','Mauro Tassotti','DEF','Italy','🇮🇹',66,44,60,82),
          p('acm95-6','Marcel Desailly','MID','France','🇫🇷',76,64,74,88),
          p('acm95-7','Zvonimir Boban','MID','Croatia','🇭🇷',74,72,82,70),
          p('acm95-8','Demetrio Albertini','MID','Italy','🇮🇹',64,60,82,62),
          p('acm95-9','Dejan Savićević','ATK','Yugoslavia','🇷🇸',84,86,82,40,true),
          p('acm95-10','Daniele Massaro','ATK','Italy','🇮🇹',78,80,70,36),
        ]
      },
    ]
  },
  {
    season: '1997-98', year: 1998, winner: 'Real Madrid',
    clubs: [
      {
        id: 'rm-1998', name: 'Real Madrid', shortName: 'Madrid', season: '1997-98',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#FFFFFF', secondaryColor: '#003DA5',
        players: [
          p('rm98-1','Bodo Illgner','GK','Germany','🇩🇪',58,28,54,84),
          p('rm98-2','Fernando Hierro','DEF','Spain','🇪🇸',74,74,72,86,true),
          p('rm98-3','Roberto Carlos','DEF','Brazil','🇧🇷',88,80,80,78,true),
          p('rm98-4','Manolo Sanchís','DEF','Spain','🇪🇸',68,46,64,82),
          p('rm98-5','Fernando Redondo','MID','Argentina','🇦🇷',78,66,86,78,true),
          p('rm98-6','Clarence Seedorf','MID','Netherlands','🇳🇱',80,76,80,64),
          p('rm98-7','Christian Karembeu','MID','France','🇫🇷',76,66,72,72),
          p('rm98-8','Raúl','ATK','Spain','🇪🇸',84,86,82,44,true),
          p('rm98-9','Predrag Mijatović','ATK','Yugoslavia','🇷🇸',84,86,78,38),
          p('rm98-10','Davor Šuker','ATK','Croatia','🇭🇷',82,88,76,36),
        ]
      },
      {
        id: 'juve-1998', name: 'Juventus', shortName: 'Juventus', season: '1997-98',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#000000', secondaryColor: '#FFFFFF',
        players: [
          p('jv98-1','Angelo Peruzzi','GK','Italy','🇮🇹',56,28,52,84),
          p('jv98-2','Ciro Ferrara','DEF','Italy','🇮🇹',70,50,66,84),
          p('jv98-3','Paolo Montero','DEF','Uruguay','🇺🇾',70,52,62,82),
          p('jv98-4','Mark Iuliano','DEF','Italy','🇮🇹',68,44,60,80),
          p('jv98-5','Zinedine Zidane','MID','France','🇫🇷',82,82,96,60,true),
          p('jv98-6','Didier Deschamps','MID','France','🇫🇷',74,62,82,78,true),
          p('jv98-7','Edgar Davids','MID','Netherlands','🇳🇱',80,70,76,76,true),
          p('jv98-8','Alessandro Del Piero','ATK','Italy','🇮🇹',84,90,84,42,true),
          p('jv98-9','Filippo Inzaghi','ATK','Italy','🇮🇹',82,90,68,34,true),
          p('jv98-10','Antonio Conte','MID','Italy','🇮🇹',74,68,76,74),
        ]
      },
    ]
  },
  {
    season: '1998-99', year: 1999, winner: 'Manchester United',
    clubs: [
      {
        id: 'manu-1999', name: 'Manchester United', shortName: 'Man United', season: '1998-99',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#DA291C', secondaryColor: '#FFE500',
        players: [
          p('mu99-1','Peter Schmeichel','GK','Denmark','🇩🇰',60,30,58,92,true),
          p('mu99-2','Denis Irwin','DEF','Ireland','🇮🇪',74,60,70,80),
          p('mu99-3','Jaap Stam','DEF','Netherlands','🇳🇱',76,48,64,90,true),
          p('mu99-4','Ronny Johnsen','DEF','Norway','🇳🇴',70,46,62,80),
          p('mu99-5','Gary Neville','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',70,50,66,78),
          p('mu99-6','Roy Keane','MID','Ireland','🇮🇪',80,72,80,82,true),
          p('mu99-7','David Beckham','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',76,72,88,62,true),
          p('mu99-8','Ryan Giggs','MID','Wales','🏴󠁧󠁢󠁷󠁬󠁳󠁿',92,78,82,54,true),
          p('mu99-9','Andy Cole','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',88,86,72,36),
          p('mu99-10','Dwight Yorke','ATK','Trinidad','🇹🇹',82,88,78,36,true),
          p('mu99-11','Ole Gunnar Solskjær','ATK','Norway','🇳🇴',84,88,72,36),
          p('mu99-12','Teddy Sheringham','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',76,82,80,38),
        ]
      },
      {
        id: 'bay-1999', name: 'Bayern Munich', shortName: 'Bayern', season: '1998-99',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#DC052D', secondaryColor: '#0066B2',
        players: [
          p('bay99-1','Oliver Kahn','GK','Germany','🇩🇪',62,28,54,92,true),
          p('bay99-2','Thomas Linke','DEF','Germany','🇩🇪',68,44,60,78),
          p('bay99-3','Lothar Matthäus','DEF','Germany','🇩🇪',76,72,80,80,true),
          p('bay99-4','Samuel Kuffour','DEF','Ghana','🇬🇭',72,48,58,80),
          p('bay99-5','Bixente Lizarazu','DEF','France','🇫🇷',78,58,68,76),
          p('bay99-6','Stefan Effenberg','MID','Germany','🇩🇪',78,74,82,68,true),
          p('bay99-7','Mehmet Scholl','MID','Germany','🇩🇪',82,74,82,58),
          p('bay99-8','Michael Tarnat','MID','Germany','🇩🇪',74,66,72,66),
          p('bay99-9','Carsten Jancker','ATK','Germany','🇩🇪',76,78,66,42),
          p('bay99-10','Giovane Élber','ATK','Brazil','🇧🇷',86,84,72,36),
          p('bay99-11','Mario Basler','ATK','Germany','🇩🇪',78,78,80,40),
        ]
      },
    ]
  },
  {
    season: '2001-02', year: 2002, winner: 'Real Madrid',
    clubs: [
      {
        id: 'rm-2002', name: 'Real Madrid', shortName: 'Madrid', season: '2001-02',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#FFFFFF', secondaryColor: '#003DA5',
        players: [
          p('rm02-1','Iker Casillas','GK','Spain','🇪🇸',66,28,60,90,true),
          p('rm02-2','Fernando Hierro','DEF','Spain','🇪🇸',72,70,70,84),
          p('rm02-3','Roberto Carlos','DEF','Brazil','🇧🇷',90,82,82,76,true),
          p('rm02-4','Iván Helguera','DEF','Spain','🇪🇸',70,54,62,82),
          p('rm02-5','Claude Makélélé','MID','France','🇫🇷',74,58,78,88,true),
          p('rm02-6','Zinedine Zidane','MID','France','🇫🇷',82,84,96,58,true),
          p('rm02-7','Luís Figo','MID','Portugal','🇵🇹',88,82,88,62,true),
          p('rm02-8','Raúl','ATK','Spain','🇪🇸',84,88,84,42,true),
          p('rm02-9','Ronaldo','ATK','Brazil','🇧🇷',88,92,78,38,true),
          p('rm02-10','Fernando Morientes','ATK','Spain','🇪🇸',78,84,74,40),
        ]
      },
      {
        id: 'leverkusen-2002', name: 'Bayer Leverkusen', shortName: 'Leverkusen', season: '2001-02',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#E32219', secondaryColor: '#000000',
        players: [
          p('lev02-1','Hans-Jörg Butt','GK','Germany','🇩🇪',56,28,50,80),
          p('lev02-2','Lucio','DEF','Brazil','🇧🇷',82,60,70,84),
          p('lev02-3','Zé Roberto','DEF','Brazil','🇧🇷',86,62,76,76),
          p('lev02-4','Carsten Ramelow','DEF','Germany','🇩🇪',70,46,64,80),
          p('lev02-5','Michael Ballack','MID','Germany','🇩🇪',80,80,80,72,true),
          p('lev02-6','Bernd Schneider','MID','Germany','🇩🇪',82,74,78,60),
          p('lev02-7','Oliver Neuville','ATK','Germany','🇩🇪',84,80,72,36),
          p('lev02-8','Dimitar Berbatov','ATK','Bulgaria','🇧🇬',78,84,78,36,true),
          p('lev02-9','Ulf Kirsten','ATK','Germany','🇩🇪',76,78,70,34),
        ]
      },
    ]
  },
  {
    season: '2004-05', year: 2005, winner: 'Liverpool',
    clubs: [
      {
        id: 'liv-2005', name: 'Liverpool', shortName: 'Liverpool', season: '2004-05',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#C8102E', secondaryColor: '#F6EB61',
        players: [
          p('liv05-1','Jerzy Dudek','GK','Poland','🇵🇱',58,28,54,84),
          p('liv05-2','Jamie Carragher','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',70,46,64,86,true),
          p('liv05-3','Sami Hyypiä','DEF','Finland','🇫🇮',72,50,66,82),
          p('liv05-4','John Arne Riise','DEF','Norway','🇳🇴',78,70,66,76),
          p('liv05-5','Steve Finnan','DEF','Ireland','🇮🇪',72,52,64,76),
          p('liv05-6','Steven Gerrard','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',84,82,86,74,true),
          p('liv05-7','Xabi Alonso','MID','Spain','🇪🇸',72,72,90,68,true),
          p('liv05-8','Didi Hamann','MID','Germany','🇩🇪',70,60,78,78),
          p('liv05-9','Luis García','MID','Spain','🇪🇸',78,74,78,58),
          p('liv05-10','Milan Baroš','ATK','Czech Republic','🇨🇿',84,78,70,34),
          p('liv05-11','Djibril Cissé','ATK','France','🇫🇷',90,80,70,34),
        ]
      },
      {
        id: 'acm-2005', name: 'AC Milan', shortName: 'Milan', season: '2004-05',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#FB090B', secondaryColor: '#000000',
        players: [
          p('acm05-1','Dida','GK','Brazil','🇧🇷',60,28,54,86),
          p('acm05-2','Paolo Maldini','DEF','Italy','🇮🇹',82,56,78,90,true),
          p('acm05-3','Alessandro Nesta','DEF','Italy','🇮🇹',74,46,68,92,true),
          p('acm05-4','Jaap Stam','DEF','Netherlands','🇳🇱',72,44,62,86),
          p('acm05-5','Cafu','DEF','Brazil','🇧🇷',88,64,76,74,true),
          p('acm05-6','Andrea Pirlo','MID','Italy','🇮🇹',66,74,94,64,true),
          p('acm05-7','Clarence Seedorf','MID','Netherlands','🇳🇱',80,76,80,62),
          p('acm05-8','Gennaro Gattuso','MID','Italy','🇮🇹',76,64,70,84,true),
          p('acm05-9','Kaká','ATK','Brazil','🇧🇷',90,88,88,44,true),
          p('acm05-10','Andriy Shevchenko','ATK','Ukraine','🇺🇦',88,92,76,38,true),
          p('acm05-11','Hernán Crespo','ATK','Argentina','🇦🇷',84,86,74,36),
        ]
      },
    ]
  },
  {
    season: '2007-08', year: 2008, winner: 'Manchester United',
    clubs: [
      {
        id: 'manu-2008', name: 'Manchester United', shortName: 'Man United', season: '2007-08',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#DA291C', secondaryColor: '#FFE500',
        players: [
          p('mu08-1','Edwin van der Sar','GK','Netherlands','🇳🇱',60,28,56,88),
          p('mu08-2','Rio Ferdinand','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',76,50,72,88,true),
          p('mu08-3','Nemanja Vidić','DEF','Serbia','🇷🇸',76,50,60,90,true),
          p('mu08-4','Patrice Evra','DEF','France','🇫🇷',84,58,72,78),
          p('mu08-5','Wes Brown','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',72,46,60,78),
          p('mu08-6','Michael Carrick','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',72,64,82,72),
          p('mu08-7','Paul Scholes','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',70,74,90,62,true),
          p('mu08-8','Ryan Giggs','MID','Wales','🏴󠁧󠁢󠁷󠁬󠁳󠁿',90,76,84,54,true),
          p('mu08-9','Cristiano Ronaldo','ATK','Portugal','🇵🇹',96,92,82,36,true),
          p('mu08-10','Wayne Rooney','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',82,86,80,42,true),
          p('mu08-11','Carlos Tevez','ATK','Argentina','🇦🇷',86,84,78,44),
        ]
      },
      {
        id: 'che-2008', name: 'Chelsea', shortName: 'Chelsea', season: '2007-08',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#034694', secondaryColor: '#DBA111',
        players: [
          p('che08-1','Petr Čech','GK','Czech Republic','🇨🇿',60,28,56,90,true),
          p('che08-2','John Terry','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',72,56,66,90,true),
          p('che08-3','Ricardo Carvalho','DEF','Portugal','🇵🇹',72,48,62,88),
          p('che08-4','Ashley Cole','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',84,56,72,82,true),
          p('che08-5','Salomon Kalou','DEF','Côte d\'Ivoire','🇨🇮',80,56,60,70),
          p('che08-6','Frank Lampard','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',74,86,84,68,true),
          p('che08-7','Michael Ballack','MID','Germany','🇩🇪',78,80,78,72,true),
          p('che08-8','Claude Makélélé','MID','France','🇫🇷',72,54,76,88),
          p('che08-9','Didier Drogba','ATK','Côte d\'Ivoire','🇨🇮',82,88,76,50,true),
          p('che08-10','Joe Cole','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',82,74,76,40),
          p('che08-11','Michael Essien','MID','Ghana','🇬🇭',82,70,74,78),
        ]
      },
    ]
  },
  {
    season: '2008-09', year: 2009, winner: 'Barcelona',
    clubs: [
      {
        id: 'bar-2009', name: 'Barcelona', shortName: 'Barcelona', season: '2008-09',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#A50044', secondaryColor: '#004D98',
        players: [
          p('bar09-1','Víctor Valdés','GK','Spain','🇪🇸',60,28,58,86),
          p('bar09-2','Dani Alves','DEF','Brazil','🇧🇷',90,70,80,76,true),
          p('bar09-3','Carles Puyol','DEF','Spain','🇪🇸',74,52,68,88,true),
          p('bar09-4','Gerard Piqué','DEF','Spain','🇪🇸',76,56,74,84),
          p('bar09-5','Eric Abidal','DEF','France','🇫🇷',82,50,68,82),
          p('bar09-6','Xavi Hernández','MID','Spain','🇪🇸',72,72,97,60,true),
          p('bar09-7','Andrés Iniesta','MID','Spain','🇪🇸',84,78,94,60,true),
          p('bar09-8','Yaya Touré','MID','Côte d\'Ivoire','🇨🇮',82,74,76,80),
          p('bar09-9','Lionel Messi','ATK','Argentina','🇦🇷',96,96,92,38,true),
          p('bar09-10','Samuel Eto\'o','ATK','Cameroon','🇨🇲',92,88,78,44,true),
          p('bar09-11','Thierry Henry','ATK','France','🇫🇷',88,84,82,38,true),
        ]
      },
      {
        id: 'manu-2009', name: 'Manchester United', shortName: 'Man United', season: '2008-09',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#DA291C', secondaryColor: '#FFE500',
        players: [
          p('mu09-1','Edwin van der Sar','GK','Netherlands','🇳🇱',60,28,56,88),
          p('mu09-2','Rio Ferdinand','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',76,50,72,88),
          p('mu09-3','Nemanja Vidić','DEF','Serbia','🇷🇸',74,48,60,90,true),
          p('mu09-4','Patrice Evra','DEF','France','🇫🇷',84,56,72,78),
          p('mu09-5','Paul Scholes','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',68,72,90,60,true),
          p('mu09-6','Michael Carrick','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',70,62,80,72),
          p('mu09-7','Ryan Giggs','MID','Wales','🏴󠁧󠁢󠁷󠁬󠁳󠁿',90,74,84,52,true),
          p('mu09-8','Cristiano Ronaldo','ATK','Portugal','🇵🇹',96,94,84,36,true),
          p('mu09-9','Wayne Rooney','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',82,86,80,42,true),
          p('mu09-10','Dimitar Berbatov','ATK','Bulgaria','🇧🇬',76,84,78,36),
        ]
      },
    ]
  },
  {
    season: '2009-10', year: 2010, winner: 'Inter Milan',
    clubs: [
      {
        id: 'inter-2010', name: 'Inter Milan', shortName: 'Inter', season: '2009-10',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#010E80', secondaryColor: '#000000',
        players: [
          p('int10-1','Júlio César','GK','Brazil','🇧🇷',60,28,54,88),
          p('int10-2','Maicon','DEF','Brazil','🇧🇷',88,72,76,80,true),
          p('int10-3','Lucio','DEF','Brazil','🇧🇷',78,58,70,84),
          p('int10-4','Iván Córdoba','DEF','Colombia','🇨🇴',70,48,60,82),
          p('int10-5','Javier Zanetti','DEF','Argentina','🇦🇷',82,62,78,82,true),
          p('int10-6','Esteban Cambiasso','MID','Argentina','🇦🇷',72,66,80,80,true),
          p('int10-7','Wesley Sneijder','MID','Netherlands','🇳🇱',80,86,88,60,true),
          p('int10-8','Dejan Stanković','MID','Serbia','🇷🇸',76,72,78,70),
          p('int10-9','Diego Milito','ATK','Argentina','🇦🇷',80,88,78,38,true),
          p('int10-10','Samuel Eto\'o','ATK','Cameroon','🇨🇲',92,88,76,42,true),
          p('int10-11','Goran Pandev','ATK','Macedonia','🇲🇰',80,76,74,36),
        ]
      },
      {
        id: 'bay-2010', name: 'Bayern Munich', shortName: 'Bayern', season: '2009-10',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#DC052D', secondaryColor: '#0066B2',
        players: [
          p('bay10-1','Hans-Jörg Butt','GK','Germany','🇩🇪',56,28,52,82),
          p('bay10-2','Philipp Lahm','DEF','Germany','🇩🇪',82,62,80,82,true),
          p('bay10-3','Daniel van Buyten','DEF','Belgium','🇧🇪',70,50,62,82),
          p('bay10-4','Hamit Altintop','DEF','Turkey','🇹🇷',76,60,68,72),
          p('bay10-5','Bastian Schweinsteiger','MID','Germany','🇩🇪',76,74,84,70,true),
          p('bay10-6','Arjen Robben','MID','Netherlands','🇳🇱',94,86,80,40,true),
          p('bay10-7','Franck Ribéry','MID','France','🇫🇷',90,82,82,44,true),
          p('bay10-8','Thomas Müller','ATK','Germany','🇩🇪',82,80,82,54,true),
          p('bay10-9','Ivica Olić','ATK','Croatia','🇭🇷',84,82,72,38),
          p('bay10-10','Mario Gómez','ATK','Germany','🇩🇪',76,84,68,38),
        ]
      },
    ]
  },
  {
    season: '2011-12', year: 2012, winner: 'Chelsea',
    clubs: [
      {
        id: 'che-2012', name: 'Chelsea', shortName: 'Chelsea', season: '2011-12',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#034694', secondaryColor: '#DBA111',
        players: [
          p('che12-1','Petr Čech','GK','Czech Republic','🇨🇿',60,28,56,90,true),
          p('che12-2','John Terry','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',70,54,64,88,true),
          p('che12-3','Gary Cahill','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',72,50,62,84),
          p('che12-4','Branislav Ivanović','DEF','Serbia','🇷🇸',74,60,64,82),
          p('che12-5','Ashley Cole','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',82,54,70,82),
          p('che12-6','Frank Lampard','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',72,84,82,66,true),
          p('che12-7','N\'Golo Kanté','MID','France','🇫🇷',78,58,74,88),
          p('che12-8','Juan Mata','MID','Spain','🇪🇸',74,76,86,52,true),
          p('che12-9','Didier Drogba','ATK','Côte d\'Ivoire','🇨🇮',80,86,74,48,true),
          p('che12-10','Ramires','MID','Brazil','🇧🇷',86,70,72,70),
          p('che12-11','Salomon Kalou','ATK','Côte d\'Ivoire','🇨🇮',82,74,68,36),
        ]
      },
      {
        id: 'bay-2012', name: 'Bayern Munich', shortName: 'Bayern', season: '2011-12',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#DC052D', secondaryColor: '#0066B2',
        players: [
          p('bay12-1','Manuel Neuer','GK','Germany','🇩🇪',68,28,66,94,true),
          p('bay12-2','Philipp Lahm','DEF','Germany','🇩🇪',84,62,82,84,true),
          p('bay12-3','Jerome Boateng','DEF','Germany','🇩🇪',76,50,68,86,true),
          p('bay12-4','David Alaba','DEF','Austria','🇦🇹',84,66,80,82,true),
          p('bay12-5','Bastian Schweinsteiger','MID','Germany','🇩🇪',76,72,84,68,true),
          p('bay12-6','Arjen Robben','MID','Netherlands','🇳🇱',94,88,80,38,true),
          p('bay12-7','Franck Ribéry','MID','France','🇫🇷',90,82,82,42,true),
          p('bay12-8','Thomas Müller','ATK','Germany','🇩🇪',80,80,82,52,true),
          p('bay12-9','Mario Gómez','ATK','Germany','🇩🇪',74,86,68,36),
          p('bay12-10','Toni Kroos','MID','Germany','🇩🇪',72,74,90,58,true),
        ]
      },
    ]
  },
  {
    season: '2012-13', year: 2013, winner: 'Bayern Munich',
    clubs: [
      {
        id: 'bay-2013', name: 'Bayern Munich', shortName: 'Bayern', season: '2012-13',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#DC052D', secondaryColor: '#0066B2',
        players: [
          p('bay13-1','Manuel Neuer','GK','Germany','🇩🇪',68,28,66,96,true),
          p('bay13-2','Philipp Lahm','DEF','Germany','🇩🇪',84,64,82,84,true),
          p('bay13-3','Jerome Boateng','DEF','Germany','🇩🇪',76,50,68,88,true),
          p('bay13-4','Dante','DEF','Brazil','🇧🇷',74,48,66,82),
          p('bay13-5','David Alaba','DEF','Austria','🇦🇹',84,68,82,82,true),
          p('bay13-6','Bastian Schweinsteiger','MID','Germany','🇩🇪',76,72,86,68,true),
          p('bay13-7','Arjen Robben','MID','Netherlands','🇳🇱',94,90,80,36,true),
          p('bay13-8','Franck Ribéry','MID','France','🇫🇷',92,84,84,40,true),
          p('bay13-9','Thomas Müller','ATK','Germany','🇩🇪',82,82,84,52,true),
          p('bay13-10','Mario Mandžukić','ATK','Croatia','🇭🇷',78,84,68,42),
          p('bay13-11','Toni Kroos','MID','Germany','🇩🇪',72,76,92,60,true),
        ]
      },
      {
        id: 'bvb-2013', name: 'Borussia Dortmund', shortName: 'Dortmund', season: '2012-13',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#FDE100', secondaryColor: '#000000',
        players: [
          p('bvb13-1','Roman Weidenfeller','GK','Germany','🇩🇪',58,28,52,84),
          p('bvb13-2','Łukasz Piszczek','DEF','Poland','🇵🇱',80,60,72,78),
          p('bvb13-3','Mats Hummels','DEF','Germany','🇩🇪',74,56,78,86,true),
          p('bvb13-4','Neven Subotić','DEF','Serbia','🇷🇸',70,48,62,82),
          p('bvb13-5','Marcel Schmelzer','DEF','Germany','🇩🇪',78,52,68,76),
          p('bvb13-6','İlkay Gündoğan','MID','Germany','🇩🇪',76,72,86,66,true),
          p('bvb13-7','Henrikh Mkhitaryan','MID','Armenia','🇦🇲',84,78,82,56),
          p('bvb13-8','Mario Götze','MID','Germany','🇩🇪',86,80,88,52,true),
          p('bvb13-9','Robert Lewandowski','ATK','Poland','🇵🇱',80,90,76,40,true),
          p('bvb13-10','Marco Reus','ATK','Germany','🇩🇪',90,86,82,44,true),
          p('bvb13-11','Kevin-Prince Boateng','ATK','Ghana','🇬🇭',82,78,74,50),
        ]
      },
    ]
  },
  {
    season: '2013-14', year: 2014, winner: 'Real Madrid',
    clubs: [
      {
        id: 'rm-2014', name: 'Real Madrid', shortName: 'Madrid', season: '2013-14',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#FFFFFF', secondaryColor: '#003DA5',
        players: [
          p('rm14-1','Iker Casillas','GK','Spain','🇪🇸',64,28,60,88),
          p('rm14-2','Sergio Ramos','DEF','Spain','🇪🇸',80,72,74,88,true),
          p('rm14-3','Raphaël Varane','DEF','France','🇫🇷',84,52,76,88,true),
          p('rm14-4','Dani Carvajal','DEF','Spain','🇪🇸',82,58,74,76),
          p('rm14-5','Marcelo','DEF','Brazil','🇧🇷',88,70,80,70,true),
          p('rm14-6','Luka Modrić','MID','Croatia','🇭🇷',80,76,92,70,true),
          p('rm14-7','Xabi Alonso','MID','Spain','🇪🇸',70,72,92,68,true),
          p('rm14-8','Ángel Di María','MID','Argentina','🇦🇷',92,84,84,52,true),
          p('rm14-9','Cristiano Ronaldo','ATK','Portugal','🇵🇹',96,96,80,34,true),
          p('rm14-10','Karim Benzema','ATK','France','🇫🇷',76,86,84,44,true),
          p('rm14-11','Gareth Bale','ATK','Wales','🏴󠁧󠁢󠁷󠁬󠁳󠁿',96,88,72,36,true),
        ]
      },
      {
        id: 'atl-2014', name: 'Atlético Madrid', shortName: 'Atlético', season: '2013-14',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#CC0000', secondaryColor: '#003DA5',
        players: [
          p('atl14-1','Thibaut Courtois','GK','Belgium','🇧🇪',64,28,58,92,true),
          p('atl14-2','Diego Godín','DEF','Uruguay','🇺🇾',76,64,68,92,true),
          p('atl14-3','Juanfran','DEF','Spain','🇪🇸',78,54,68,78),
          p('atl14-4','Filipe Luís','DEF','Brazil','🇧🇷',82,58,72,78),
          p('atl14-5','Miranda','DEF','Brazil','🇧🇷',74,50,62,82),
          p('atl14-6','Gabi','MID','Spain','🇪🇸',74,68,78,74),
          p('atl14-7','Tiago','MID','Portugal','🇵🇹',70,64,78,76),
          p('atl14-8','Arda Turan','MID','Turkey','🇹🇷',82,76,80,56),
          p('atl14-9','Diego Costa','ATK','Spain','🇪🇸',82,86,72,50,true),
          p('atl14-10','David Villa','ATK','Spain','🇪🇸',78,86,78,36,true),
          p('atl14-11','Adrián','ATK','Spain','🇪🇸',82,80,72,36),
        ]
      },
    ]
  },
  {
    season: '2017-18', year: 2018, winner: 'Real Madrid',
    clubs: [
      {
        id: 'rm-2018', name: 'Real Madrid', shortName: 'Madrid', season: '2017-18',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#FFFFFF', secondaryColor: '#003DA5',
        players: [
          p('rm18-1','Keylor Navas','GK','Costa Rica','🇨🇷',64,28,58,90),
          p('rm18-2','Sergio Ramos','DEF','Spain','🇪🇸',80,74,74,90,true),
          p('rm18-3','Raphaël Varane','DEF','France','🇫🇷',86,52,78,92,true),
          p('rm18-4','Dani Carvajal','DEF','Spain','🇪🇸',84,58,76,78),
          p('rm18-5','Marcelo','DEF','Brazil','🇧🇷',88,70,82,70,true),
          p('rm18-6','Luka Modrić','MID','Croatia','🇭🇷',82,78,94,68,true),
          p('rm18-7','Toni Kroos','MID','Germany','🇩🇪',70,78,96,62,true),
          p('rm18-8','Casemiro','MID','Brazil','🇧🇷',72,66,78,88,true),
          p('rm18-9','Cristiano Ronaldo','ATK','Portugal','🇵🇹',96,96,80,34,true),
          p('rm18-10','Karim Benzema','ATK','France','🇫🇷',78,88,86,44,true),
          p('rm18-11','Gareth Bale','ATK','Wales','🏴󠁧󠁢󠁷󠁬󠁳󠁿',96,86,72,36),
        ]
      },
      {
        id: 'liv-2018', name: 'Liverpool', shortName: 'Liverpool', season: '2017-18',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#C8102E', secondaryColor: '#F6EB61',
        players: [
          p('liv18-1','Loris Karius','GK','Germany','🇩🇪',58,28,52,80),
          p('liv18-2','Virgil van Dijk','DEF','Netherlands','🇳🇱',76,60,72,92,true),
          p('liv18-3','Andrew Robertson','DEF','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',84,56,78,76),
          p('liv18-4','Trent Alexander-Arnold','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',82,70,84,72),
          p('liv18-5','Jordan Henderson','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',74,66,80,72),
          p('liv18-6','Georginio Wijnaldum','MID','Netherlands','🇳🇱',78,72,78,68),
          p('liv18-7','James Milner','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',76,68,78,74),
          p('liv18-8','Mohamed Salah','ATK','Egypt','🇪🇬',94,92,82,36,true),
          p('liv18-9','Sadio Mané','ATK','Senegal','🇸🇳',92,84,80,44,true),
          p('liv18-10','Roberto Firmino','ATK','Brazil','🇧🇷',80,82,84,54,true),
        ]
      },
    ]
  },
  {
    season: '2018-19', year: 2019, winner: 'Liverpool',
    clubs: [
      {
        id: 'liv-2019', name: 'Liverpool', shortName: 'Liverpool', season: '2018-19',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#C8102E', secondaryColor: '#F6EB61',
        players: [
          p('liv19-1','Alisson Becker','GK','Brazil','🇧🇷',64,28,62,92,true),
          p('liv19-2','Virgil van Dijk','DEF','Netherlands','🇳🇱',78,62,74,94,true),
          p('liv19-3','Trent Alexander-Arnold','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',84,72,86,72,true),
          p('liv19-4','Andrew Robertson','DEF','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',86,58,80,78),
          p('liv19-5','Joe Gomez','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',82,48,68,80),
          p('liv19-6','Jordan Henderson','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',74,66,80,72),
          p('liv19-7','Fabinho','MID','Brazil','🇧🇷',76,62,78,84,true),
          p('liv19-8','Georginio Wijnaldum','MID','Netherlands','🇳🇱',80,72,80,68),
          p('liv19-9','Mohamed Salah','ATK','Egypt','🇪🇬',96,94,82,36,true),
          p('liv19-10','Sadio Mané','ATK','Senegal','🇸🇳',92,86,80,44,true),
          p('liv19-11','Roberto Firmino','ATK','Brazil','🇧🇷',82,84,86,54,true),
        ]
      },
      {
        id: 'tot-2019', name: 'Tottenham', shortName: 'Spurs', season: '2018-19',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#132257', secondaryColor: '#FFFFFF',
        players: [
          p('tot19-1','Hugo Lloris','GK','France','🇫🇷',60,28,56,88),
          p('tot19-2','Toby Alderweireld','DEF','Belgium','🇧🇪',74,54,70,86),
          p('tot19-3','Jan Vertonghen','DEF','Belgium','🇧🇪',74,50,68,84),
          p('tot19-4','Kieran Trippier','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',78,60,76,74),
          p('tot19-5','Danny Rose','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',80,54,68,76),
          p('tot19-6','Christian Eriksen','MID','Denmark','🇩🇰',76,78,88,54,true),
          p('tot19-7','Moussa Sissoko','MID','France','🇫🇷',82,66,68,70),
          p('tot19-8','Dele Alli','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',78,78,76,56),
          p('tot19-9','Harry Kane','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',74,92,80,44,true),
          p('tot19-10','Son Heung-min','ATK','South Korea','🇰🇷',90,82,76,40,true),
          p('tot19-11','Lucas Moura','ATK','Brazil','🇧🇷',88,80,74,38),
        ]
      },
    ]
  },
  {
    season: '2019-20', year: 2020, winner: 'Bayern Munich',
    clubs: [
      {
        id: 'bay-2020', name: 'Bayern Munich', shortName: 'Bayern', season: '2019-20',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#DC052D', secondaryColor: '#0066B2',
        players: [
          p('bay20-1','Manuel Neuer','GK','Germany','🇩🇪',66,28,64,96,true),
          p('bay20-2','Alphonso Davies','DEF','Canada','🇨🇦',96,66,76,78,true),
          p('bay20-3','David Alaba','DEF','Austria','🇦🇹',84,70,84,86,true),
          p('bay20-4','Jerome Boateng','DEF','Germany','🇩🇪',74,50,68,84),
          p('bay20-5','Benjamin Pavard','DEF','France','🇫🇷',76,56,68,78),
          p('bay20-6','Joshua Kimmich','MID','Germany','🇩🇪',82,74,90,78,true),
          p('bay20-7','Thomas Müller','MID','Germany','🇩🇪',80,82,88,58,true),
          p('bay20-8','Leon Goretzka','MID','Germany','🇩🇪',80,76,80,72),
          p('bay20-9','Robert Lewandowski','ATK','Poland','🇵🇱',78,96,80,44,true),
          p('bay20-10','Serge Gnabry','ATK','Germany','🇩🇪',92,88,80,42,true),
          p('bay20-11','Kingsley Coman','ATK','France','🇫🇷',94,82,76,38),
        ]
      },
      {
        id: 'psg-2020', name: 'PSG', shortName: 'PSG', season: '2019-20',
        country: 'France', flag: '🇫🇷', primaryColor: '#004170', secondaryColor: '#DA291C',
        players: [
          p('psg20-1','Keylor Navas','GK','Costa Rica','🇨🇷',64,28,58,90),
          p('psg20-2','Thiago Silva','DEF','Brazil','🇧🇷',72,56,72,90,true),
          p('psg20-3','Marquinhos','DEF','Brazil','🇧🇷',82,54,76,88,true),
          p('psg20-4','Presnel Kimpembe','DEF','France','🇫🇷',76,50,66,82),
          p('psg20-5','Juan Bernat','DEF','Spain','🇪🇸',80,54,70,74),
          p('psg20-6','Marco Verratti','MID','Italy','🇮🇹',72,68,90,68,true),
          p('psg20-7','Ander Herrera','MID','Spain','🇪🇸',74,66,78,72),
          p('psg20-8','Ángel Di María','MID','Argentina','🇦🇷',90,82,84,48,true),
          p('psg20-9','Neymar Jr','ATK','Brazil','🇧🇷',92,88,90,36,true),
          p('psg20-10','Kylian Mbappé','ATK','France','🇫🇷',98,90,82,36,true),
          p('psg20-11','Pablo Sarabia','ATK','Spain','🇪🇸',84,78,76,40),
        ]
      },
    ]
  },
  {
    season: '2020-21', year: 2021, winner: 'Chelsea',
    clubs: [
      {
        id: 'che-2021', name: 'Chelsea', shortName: 'Chelsea', season: '2020-21',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#034694', secondaryColor: '#DBA111',
        players: [
          p('che21-1','Édouard Mendy','GK','Senegal','🇸🇳',62,28,56,90),
          p('che21-2','Thiago Silva','DEF','Brazil','🇧🇷',70,54,72,90,true),
          p('che21-3','Antonio Rüdiger','DEF','Germany','🇩🇪',80,56,66,86),
          p('che21-4','Ben Chilwell','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',84,62,74,76),
          p('che21-5','César Azpilicueta','DEF','Spain','🇪🇸',78,52,70,80),
          p('che21-6','N\'Golo Kanté','MID','France','🇫🇷',82,64,80,94,true),
          p('che21-7','Jorginho','MID','Italy','🇮🇹',66,62,82,74,true),
          p('che21-8','Mason Mount','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',78,76,82,60),
          p('che21-9','Kai Havertz','ATK','Germany','🇩🇪',80,82,82,42,true),
          p('che21-10','Christian Pulisic','ATK','USA','🇺🇸',88,76,76,40),
          p('che21-11','Timo Werner','ATK','Germany','🇩🇪',92,78,72,38),
        ]
      },
      {
        id: 'mci-2021', name: 'Manchester City', shortName: 'Man City', season: '2020-21',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#6CABDD', secondaryColor: '#1C2C5B',
        players: [
          p('mci21-1','Ederson','GK','Brazil','🇧🇷',64,28,68,90),
          p('mci21-2','Rúben Dias','DEF','Portugal','🇵🇹',76,52,72,90,true),
          p('mci21-3','John Stones','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',74,52,76,82),
          p('mci21-4','Kyle Walker','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',86,58,72,80),
          p('mci21-5','Oleksandr Zinchenko','DEF','Ukraine','🇺🇦',80,60,76,74),
          p('mci21-6','Kevin De Bruyne','MID','Belgium','🇧🇪',78,84,96,60,true),
          p('mci21-7','İlkay Gündoğan','MID','Germany','🇩🇪',76,78,86,64,true),
          p('mci21-8','Bernardo Silva','MID','Portugal','🇵🇹',82,76,88,66,true),
          p('mci21-9','Phil Foden','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',86,84,82,44,true),
          p('mci21-10','Raheem Sterling','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',92,82,76,38),
          p('mci21-11','Riyad Mahrez','ATK','Algeria','🇩🇿',88,84,78,36),
        ]
      },
    ]
  },
  {
    season: '2021-22', year: 2022, winner: 'Real Madrid',
    clubs: [
      {
        id: 'rm-2022', name: 'Real Madrid', shortName: 'Madrid', season: '2021-22',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#FFFFFF', secondaryColor: '#003DA5',
        players: [
          p('rm22-1','Thibaut Courtois','GK','Belgium','🇧🇪',68,28,62,96,true),
          p('rm22-2','Éder Militão','DEF','Brazil','🇧🇷',84,56,72,88,true),
          p('rm22-3','David Alaba','DEF','Austria','🇦🇹',84,68,82,84,true),
          p('rm22-4','Dani Carvajal','DEF','Spain','🇪🇸',82,60,76,78),
          p('rm22-5','Ferland Mendy','DEF','France','🇫🇷',84,56,72,80),
          p('rm22-6','Luka Modrić','MID','Croatia','🇭🇷',80,78,94,68,true),
          p('rm22-7','Toni Kroos','MID','Germany','🇩🇪',68,78,96,62,true),
          p('rm22-8','Casemiro','MID','Brazil','🇧🇷',72,68,80,90,true),
          p('rm22-9','Karim Benzema','ATK','France','🇫🇷',78,94,90,46,true),
          p('rm22-10','Vinícius Júnior','ATK','Brazil','🇧🇷',96,84,80,36,true),
          p('rm22-11','Rodrygo','ATK','Brazil','🇧🇷',88,82,78,38),
        ]
      },
      {
        id: 'liv-2022', name: 'Liverpool', shortName: 'Liverpool', season: '2021-22',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#C8102E', secondaryColor: '#F6EB61',
        players: [
          p('liv22-1','Alisson Becker','GK','Brazil','🇧🇷',64,28,62,94,true),
          p('liv22-2','Virgil van Dijk','DEF','Netherlands','🇳🇱',78,62,74,94,true),
          p('liv22-3','Trent Alexander-Arnold','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',84,74,90,72,true),
          p('liv22-4','Andrew Robertson','DEF','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿',86,58,82,78),
          p('liv22-5','Joël Matip','DEF','Cameroon','🇨🇲',74,50,66,80),
          p('liv22-6','Thiago Alcântara','MID','Spain','🇪🇸',72,70,92,64,true),
          p('liv22-7','Fabinho','MID','Brazil','🇧🇷',76,62,80,86,true),
          p('liv22-8','Jordan Henderson','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',74,66,80,72),
          p('liv22-9','Mohamed Salah','ATK','Egypt','🇪🇬',96,94,82,36,true),
          p('liv22-10','Sadio Mané','ATK','Senegal','🇸🇳',92,86,80,44,true),
          p('liv22-11','Diogo Jota','ATK','Portugal','🇵🇹',84,84,76,40),
        ]
      },
    ]
  },
  {
    season: '2022-23', year: 2023, winner: 'Manchester City',
    clubs: [
      {
        id: 'mci-2023', name: 'Manchester City', shortName: 'Man City', season: '2022-23',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#6CABDD', secondaryColor: '#1C2C5B',
        players: [
          p('mci23-1','Ederson','GK','Brazil','🇧🇷',64,28,68,90),
          p('mci23-2','Rúben Dias','DEF','Portugal','🇵🇹',78,54,74,92,true),
          p('mci23-3','Kyle Walker','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',88,60,74,82),
          p('mci23-4','Manuel Akanji','DEF','Switzerland','🇨🇭',80,52,70,84),
          p('mci23-5','Nathan Aké','DEF','Netherlands','🇳🇱',78,54,68,80),
          p('mci23-6','Rodri','MID','Spain','🇪🇸',74,72,88,88,true),
          p('mci23-7','Kevin De Bruyne','MID','Belgium','🇧🇪',78,86,98,62,true),
          p('mci23-8','Bernardo Silva','MID','Portugal','🇵🇹',82,78,90,66,true),
          p('mci23-9','Erling Haaland','ATK','Norway','🇳🇴',84,98,72,40,true),
          p('mci23-10','Phil Foden','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',88,86,84,44,true),
          p('mci23-11','Jack Grealish','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',88,74,80,42),
        ]
      },
      {
        id: 'int-2023', name: 'Inter Milan', shortName: 'Inter', season: '2022-23',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#010E80', secondaryColor: '#000000',
        players: [
          p('int23-1','André Onana','GK','Cameroon','🇨🇲',62,28,58,86),
          p('int23-2','Alessandro Bastoni','DEF','Italy','🇮🇹',82,58,84,84,true),
          p('int23-3','Federico Dimarco','DEF','Italy','🇮🇹',82,66,78,76),
          p('int23-4','Stefan de Vrij','DEF','Netherlands','🇳🇱',76,52,70,82),
          p('int23-5','Denzel Dumfries','DEF','Netherlands','🇳🇱',84,66,72,76),
          p('int23-6','Nicolò Barella','MID','Italy','🇮🇹',82,76,84,72,true),
          p('int23-7','Hakan Çalhanoğlu','MID','Turkey','🇹🇷',76,76,86,66,true),
          p('int23-8','Henrikh Mkhitaryan','MID','Armenia','🇦🇲',80,74,82,64),
          p('int23-9','Lautaro Martínez','ATK','Argentina','🇦🇷',82,90,78,44,true),
          p('int23-10','Romelu Lukaku','ATK','Belgium','🇧🇪',80,86,72,48),
          p('int23-11','Edin Džeko','ATK','Bosnia','🇧🇦',76,82,76,42),
        ]
      },
    ]
  },
  {
    season: '2023-24', year: 2024, winner: 'Real Madrid',
    clubs: [
      {
        id: 'rm-2024', name: 'Real Madrid', shortName: 'Madrid', season: '2023-24',
        country: 'Spain', flag: '🇪🇸', primaryColor: '#FFFFFF', secondaryColor: '#003DA5',
        players: [
          p('rm24-1','Andriy Lunin','GK','Ukraine','🇺🇦',62,28,58,86),
          p('rm24-2','Éder Militão','DEF','Brazil','🇧🇷',86,58,74,90,true),
          p('rm24-3','Antonio Rüdiger','DEF','Germany','🇩🇪',82,58,68,88),
          p('rm24-4','Dani Carvajal','DEF','Spain','🇪🇸',84,62,78,80),
          p('rm24-5','Ferland Mendy','DEF','France','🇫🇷',84,56,72,80),
          p('rm24-6','Luka Modrić','MID','Croatia','🇭🇷',78,76,92,66,true),
          p('rm24-7','Toni Kroos','MID','Germany','🇩🇪',66,76,96,60,true),
          p('rm24-8','Federico Valverde','MID','Uruguay','🇺🇾',86,76,82,76,true),
          p('rm24-9','Jude Bellingham','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',90,90,88,66,true),
          p('rm24-10','Vinícius Júnior','ATK','Brazil','🇧🇷',98,86,82,36,true),
          p('rm24-11','Rodrygo','ATK','Brazil','🇧🇷',90,84,80,38),
        ]
      },
      {
        id: 'bvb-2024', name: 'Borussia Dortmund', shortName: 'Dortmund', season: '2023-24',
        country: 'Germany', flag: '🇩🇪', primaryColor: '#FDE100', secondaryColor: '#000000',
        players: [
          p('bvb24-1','Gregor Kobel','GK','Switzerland','🇨🇭',60,28,54,86),
          p('bvb24-2','Mats Hummels','DEF','Germany','🇩🇪',68,52,76,84,true),
          p('bvb24-3','Nico Schlotterbeck','DEF','Germany','🇩🇪',76,52,72,80),
          p('bvb24-4','Ian Maatsen','DEF','Netherlands','🇳🇱',82,58,72,74),
          p('bvb24-5','Emre Can','DEF','Germany','🇩🇪',76,62,72,78),
          p('bvb24-6','Marcel Sabitzer','MID','Austria','🇦🇹',78,72,78,66),
          p('bvb24-7','Julian Brandt','MID','Germany','🇩🇪',80,76,84,58),
          p('bvb24-8','Niclas Füllkrug','ATK','Germany','🇩🇪',76,86,70,46,true),
          p('bvb24-9','Donyell Malen','ATK','Netherlands','🇳🇱',90,82,72,36),
          p('bvb24-10','Karim Adeyemi','ATK','Germany','🇩🇪',94,78,70,36),
          p('bvb24-11','Jamie Bynoe-Gittens','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',88,76,70,34),
        ]
      },
    ]
  },
  {
    season: '2024-25', year: 2025, winner: 'PSG',
    clubs: [
      {
        id: 'psg-2025', name: 'PSG', shortName: 'PSG', season: '2024-25',
        country: 'France', flag: '🇫🇷', primaryColor: '#004170', secondaryColor: '#DA291C',
        players: [
          p('psg25-1','Gianluigi Donnarumma','GK','Italy','🇮🇹',64,28,60,94,true),
          p('psg25-2','Marquinhos','DEF','Brazil','🇧🇷',82,56,78,90,true),
          p('psg25-3','Achraf Hakimi','DEF','Morocco','🇲🇦',92,72,80,76,true),
          p('psg25-4','Willian Pacho','DEF','Ecuador','🇪🇨',80,52,68,84),
          p('psg25-5','Nuno Mendes','DEF','Portugal','🇵🇹',86,60,76,78),
          p('psg25-6','Vitinha','MID','Portugal','🇵🇹',78,72,90,68,true),
          p('psg25-7','Fabián Ruiz','MID','Spain','🇪🇸',76,74,86,64),
          p('psg25-8','Warren Zaïre-Emery','MID','France','🇫🇷',84,74,82,66,true),
          p('psg25-9','Ousmane Dembélé','ATK','France','🇫🇷',96,84,82,36,true),
          p('psg25-10','Bradley Barcola','ATK','France','🇫🇷',94,82,78,34,true),
          p('psg25-11','Gonçalo Ramos','ATK','Portugal','🇵🇹',80,86,74,42),
        ]
      },
      {
        id: 'int-2025', name: 'Inter Milan', shortName: 'Inter', season: '2024-25',
        country: 'Italy', flag: '🇮🇹', primaryColor: '#010E80', secondaryColor: '#000000',
        players: [
          p('int25-1','Yann Sommer','GK','Switzerland','🇨🇭',62,28,56,88),
          p('int25-2','Alessandro Bastoni','DEF','Italy','🇮🇹',84,60,86,86,true),
          p('int25-3','Federico Dimarco','DEF','Italy','🇮🇹',84,68,80,78),
          p('int25-4','Denzel Dumfries','DEF','Netherlands','🇳🇱',86,68,74,78),
          p('int25-5','Matteo Darmian','DEF','Italy','🇮🇹',76,50,68,78),
          p('int25-6','Nicolò Barella','MID','Italy','🇮🇹',84,78,86,74,true),
          p('int25-7','Hakan Çalhanoğlu','MID','Turkey','🇹🇷',76,78,88,68,true),
          p('int25-8','Davide Frattesi','MID','Italy','🇮🇹',82,76,80,68),
          p('int25-9','Lautaro Martínez','ATK','Argentina','🇦🇷',82,92,80,46,true),
          p('int25-10','Marcus Thuram','ATK','France','🇫🇷',88,86,76,44,true),
          p('int25-11','Mehdi Taremi','ATK','Iran','🇮🇷',76,82,76,42),
        ]
      },
    ]
  },
  {
    season: '2025-26', year: 2026, winner: 'PSG',
    clubs: [
      {
        id: 'psg-2026', name: 'PSG', shortName: 'PSG', season: '2025-26',
        country: 'France', flag: '🇫🇷', primaryColor: '#004170', secondaryColor: '#DA291C',
        players: [
          p('psg26-1','Gianluigi Donnarumma','GK','Italy','🇮🇹',64,28,60,96,true),
          p('psg26-2','Marquinhos','DEF','Brazil','🇧🇷',82,56,78,92,true),
          p('psg26-3','Achraf Hakimi','DEF','Morocco','🇲🇦',94,74,82,78,true),
          p('psg26-4','Willian Pacho','DEF','Ecuador','🇪🇨',82,54,70,86),
          p('psg26-5','Nuno Mendes','DEF','Portugal','🇵🇹',88,62,78,80),
          p('psg26-6','Vitinha','MID','Portugal','🇵🇹',80,74,92,68,true),
          p('psg26-7','Fabián Ruiz','MID','Spain','🇪🇸',78,76,88,66),
          p('psg26-8','Warren Zaïre-Emery','MID','France','🇫🇷',86,76,84,68,true),
          p('psg26-9','Ousmane Dembélé','ATK','France','🇫🇷',96,86,84,36,true),
          p('psg26-10','Bradley Barcola','ATK','France','🇫🇷',96,84,80,34,true),
          p('psg26-11','Gonçalo Ramos','ATK','Portugal','🇵🇹',80,88,76,42),
        ]
      },
      {
        id: 'ars-2026', name: 'Arsenal', shortName: 'Arsenal', season: '2025-26',
        country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', primaryColor: '#EF0107', secondaryColor: '#FFFFFF',
        players: [
          p('ars26-1','David Raya','GK','Spain','🇪🇸',64,28,60,90),
          p('ars26-2','William Saliba','DEF','France','🇫🇷',84,56,80,92,true),
          p('ars26-3','Gabriel Magalhães','DEF','Brazil','🇧🇷',78,60,68,88),
          p('ars26-4','Ben White','DEF','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',80,58,74,82),
          p('ars26-5','Oleksandr Zinchenko','DEF','Ukraine','🇺🇦',80,60,78,74),
          p('ars26-6','Martin Ødegaard','MID','Norway','🇳🇴',78,80,92,60,true),
          p('ars26-7','Declan Rice','MID','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',80,70,84,84,true),
          p('ars26-8','Thomas Partey','MID','Ghana','🇬🇭',78,68,78,84),
          p('ars26-9','Bukayo Saka','ATK','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿',90,84,86,54,true),
          p('ars26-10','Gabriel Martinelli','ATK','Brazil','🇧🇷',92,82,76,40),
          p('ars26-11','Kai Havertz','ATK','Germany','🇩🇪',82,82,82,52),
        ]
      },
    ]
  },
]
