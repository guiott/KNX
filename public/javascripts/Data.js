var Group = 
[
				[0x00, 0x00, 0x00, ""],							//NULL

				[0x0D, 0xD1, 0x00, "Salone Luci SX"],			//luce 01 salotto	lato porta
				[0x0D, 0xD9, 0x00, "Salone Luci DX"],			//luce 02 salotto	lato finestra
				[0x0E, 0x69, 0x00, "Salone Abatjour"],			//presa soggiorno abat jour	
				[0x0D, 0xE1, 0x00, "Balcone"],					//cucina esterno	
				[0x0D, 0xE9, 0x00, "Cucina"],					//luce 01 cucina	principale
				[0x0D, 0xF1, 0x00, "Cucina pensili"],			//luce 02 cucina	top pensili
				[0x0E, 0x19, 0x00, "Laboratorio"],				//Luce cameretta	CED
				[0x0E, 0x29, 0x00, "Letto Luci 1"],				//Luce 01 camera matr.	
				[0x0E, 0x31, 0x00, "Letto Luci 2"],				//Luce 02 camera matr.	
				[0x0E, 0x81, 0x00, "Testata Letto"],			//Luce 03 camera matr.	
				[0x0E, 0x39, 0x00, "Camera SX"],				//Luce 01 camera	
				[0x0E, 0x41, 0x00, "Camera DX"],				//Luce 02 camera	
				[0x0E, 0x51, 0x00, "Ingresso"],					//Luce entrata	ingresso
				[0x0E, 0x21, 0x00, "Disimpegno Giorno"],		//Luce corridoio	disimpegno giorno
				[0x0E, 0x59, 0x00, "Disimpegno Notte"],			//Luce ingresso	disimpegno notte
				[0x0E, 0x49, 0x00, "Bagno Notte"],				//Luce 02 bagno (N)	bagno notte
				[0x0E, 0x61, 0x00, "Bagno Giorno"],				//Luce 01 bagno (G)	bagno giorno
				[0x0E, 0x71, 0x00, "Presa TV"],					//Presa vano tecnico	
				
				[0x0B, 0x03, 0x00, "Luci OFF"],					//scenario Luci OFF
				[0x0B, 0x02, 0x00, "Tapparelle Su"],			//scenario Tapparelle SU
				[0x0B, 0x01, 0x00, "Tapparelle Giu"],			//scenario Tapparelle GIU

]

var GroupTap = 
[
				[0x00, 0x00, 0x00, ""],							//NULL

				[0x0D, 0xCA, 0xC9, "Salone"],					//tapparelle salotto	
				[0x0D, 0xBA, 0xB9, "Cucina porta finestra"],	//tapparelle 02 cucina	porta finestra
				[0x0D, 0xC2, 0xC1, "Cucina finestrina"],		//tapparelle 01 cucina	finestrina
				[0x0D, 0xFA, 0xF9, "Laboratorio"],				//tapparella cameretta	CED
				[0x0E, 0x0A, 0x09, "Camera Letto"],				//tapparella camera matr.	
				[0x0E, 0x12, 0x11, "Camera"],					//tapparella camera	
				[0x0E, 0x02, 0x01, "Bagno notte"],				//tapparelle bagno(N)	bagno notte
				[0x0E, 0x7A, 0x79, "Bagno Giorno"]				//Tapparella 01 bagno (G)	bagno giorno
]

var Device = 
[/*
	T 	= attuatori tapparelle
	R	= relè
	P	= pulsantiera
	1	= pulsantiera vicino la porta
	2-n	= altre pulsantiere in senso orario
	A-X	= coppie pulsanti a partire da SX
 */
				[1,  "T.Cucina"],								//Attuatore Tapparelle Cucina
				[2,  "P.Cucina2A"],								//Pulsantiera Cucina Finestra SX (2)
				[3,  "P.Cucina1A"],								//Pulsantiera Cucina Porta DX (2)
				[4,  "T.Salone"],								//Attuatore Tapparelle Salone
				[5,  "P.Salone2A"],								//Pulsantiera Salone Finestra SX (2)
				[6,  "R.SaloneSX"],								//Relè Salone Luci SX
				[7,  "R.SaloneDX"],								//Relè Salone Luci DX
				[8,  "P.Salone2B"],								//Pulsantiera Salone Finestra DX (2)
				[9,  "P.Cucina2B"],								//Pulsantiera Cucina Finestra DX (2)
				[10, "R.Cucina"],								//Relè Cucina Luci Principale
				[11, "P.Disimpegno Notte2"],					//Pulsantiera Dismpegno Notte 2 (3)
				[12, "P.LaboratorioB"],							//Pulsantiera Laboratorio DX (2)
				[13, "T.Laboratorio"],							//Attuatore Tapparelle Laboratorio
				[14, "T.Bagno Notte"],							//Attuatore Tapparelle Bagno Notte
				[15, "P.Bagno Notte"],							//Pulsantiera Bagno Notte (3)
				[16, "T.Camera"],								//Attuatore Tapparelle Camera
				[17, "NA"],										//Non Usato
				[18, "T.Camera Letto"],							//Attuatore Tapparelle Camera Letto
				[19, "P.Camera Letto1B"],						//Pulsantiera Camera Letto 1 DX (2)
				[20, "R.Laboratorio"],							//Relè Laboratorio Luci
				[21, "R.Disimpegno Giorno"],					//Relè Disimpegno Giorno Luci
				[22, "P.Cucina1A"],								//Pulsantiera Cucina Porta SX (2)
				[23, "R.Camera Letto1"],						//Relè Camera Letto Luci 1
				[24, "P.Camera Letto1A"],						//Pulsantiera Camera Letto 1 SX (2)
				[25, "R.Camera Letto2"],						//Relè Camera Letto Luci 2
				[26, "R.Camera1"],								//Relè Camera Luci 1
				[27, "P.Camera1B"],								//Pulsantiera Camera 1 DX (2)
				[28, "R.Camera2"],								//Relè Camera Luci 2
				[29, "R.Bagno Notte"],							//Relè Bagno Notte Luci
				[30, "P.Camera2B"],								//Pulsantiera Camera 2 DX (2)
				[31, "P.Camera Letto3B"],						//Pulsantiera Camera Letto 3 DX (2)
				[32, "P.Camera Letto2B"],						//Pulsantiera Camera Letto 2 DX (2)
				[33, "R.Disimpegno Notte"],						//Relè Disimpegno Notte Luci
				[34, "R.Ingresso"],								//Relè Ingresso Luci
				[35, "R.Cucina Pensili"],						//Relè Cucina Pensili Luci
				[36, "P.LaboratorioA"],							//Pulsantiera Laboratorio SX (2)
				[37, "P.Ingresso2"],							//Pulsantiera Ingresso 2 (3)
				[38, "P.Disimpegno Giorno"],					//Pulsantiera Disimpegno Giorno (3)
				[39, "P.Salone1"],								//Pulsantiera Salone 1 (3)
				[40, "R.Bagno Notte"],							//Relè Bagno Giorno Luci
				[41, "P.Bagno Giorno"],							//Pulsantiera Bagno Giorno (3)
				[42, "T.Bagno Giorno"],							//Attuatore Tapparelle Bagno Giorno
				[43, "R.Vano tecnico"],							//Relè Vano Tecnico TV
				[44, "R.Abatjour"],								//Relè Soggiorno Abatjour
				[45, "P.Camera1A"],								//Pulsantiera Camera 1 SX (2)
				[46, "P.Ingressso1B"],							//Pulsantiera Ingresso 1 DX (3)
				[47, "P.Ingressso1A"],							//Pulsantiera Ingresso 1 SX (3)
				[48, "P.Disimpegno Notte1"],					//Pulsantiera Dismpegno Notte 1 (3)
				[49, "P.Camera Letto3A"],						//Pulsantiera Camera Letto 3 SX (stesso device relè) (2)
				//[49, "R.Camera Letto3"],						//Relè Camera Letto Luci Testata 
				[50, "P.Camera Letto2A"],						//Pulsantiera Camera Letto 2 SX (2)
				[51, "P.Camera2A"],								//Pulsantiera Camera 2 SX (2)
				[170,"Centrale"],								//Centrale di controllo
		
]