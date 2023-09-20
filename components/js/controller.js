var mdss =  angular.module('CL350MDSS', []);
mdss.controller('mdssController', function($scope, $timeout) {
    $scope.author = "Robert McLaughlin";
    $scope.version = "0.3";
    $scope.date = "June 26th, 2017";
    $scope.dbname = "MDT_810-0042-270";
    $scope.scenarioid = "1008";
    $scope.scenariolruid = "";
    $scope.data = [];
    $scope.mode = "MDC";
    $scope.breadcrumb = [];
    $scope.currentview = "";
    $scope.currentselection = 0;
    $scope.currentfault = [];
    $scope.currentlru = [];
    $scope.faults = [];
    $scope.faultselected = 0;
    $scope.lrus = [];
    $scope.lruselected = 0;
    $scope.lruequation = "equation details";
    $scope.terms = [];
    $scope.termselected = [];
  
    $scope.lmfd = [];
    $scope.rmfd = [];
	
	$scope.pagenumber = "";
	$scope.pageof = "";
    //getMdcMenu();

    $scope.test = function () {
        console.log("TESTING:");
        $scope.findselected();
        /*for (var i = 0; i < 27; i++ ) {
          console.log(i + "...selected:" + $scope.lmfd[i].selected);
          console.log(i + ".selectable:" + $scope.lmfd[i].selectable);
          console.log(i + ".....action:" + $scope.lmfd[i].action);
          console.log(i + ".....column:" + $scope.lmfd[i].content.column);
          console.log(i + "......style:" + $scope.lmfd[i].content.style);
          console.log(i + ".......text:" + $scope.lmfd[i].content.text);
          console.log("............");
        };
        */
    };
        // STYLE objects
    $scope.setcolor = function (mySel,myCol){
            if (mySel == true) {
                return {"color" : "#FF00FF"};
            }
            switch(myCol) {
                case 'amber':
                    return { "color" : "#FFBF00"};
                    break;
                case 'cyan':
                    return {"color" : "#00FFFF"};
                    break;
                case 'white':
                    return {"color" : "#FFFFFF"};
                    break;
                case 'magenta':
                    return {"color" : "#FF00FF"};
                    break;
                case 'red':
                    return {"color" : "#FF0000"};
                    break;
                case 'green':
                    return {"color" : "#00FF00"};
                    break;
                default:
                    return {"color" : "#FFBF00"}; //amber
                }
    };
        // end STYLE objects
        
    // MFD construct
        // MFD construct
        var mfd = [];
        for (var i = 0; i < 27; i++ ) {
            if (i % 2 == 0){
                var xfdline = {
                "selected" : false,
                "selectable" : false,
                "action" : "",
                "fkey": {
                    "style" : "amber",
                    "text" : ""
                },
                "content"    : {
                    "column" : 1,
                    "style" : "amber",
                    "text" : ""
                    }
                };
            } else {
               var xfdline = {
                "selected" : false,
                "selectable" : false,
                "action" : "",
                "fkey": {
                    "style" : "amber",
                    "text" : ""
                },
                "content"    : {
                    "column" : 1,
                    "style" : "cyan",
                    "text" : ""
                    }
                }; 
            }
        
            mfd.push(xfdline);
        }
		

        
        $scope.lmfd = mfd;
        $scope.rmfd = mfd;
        $scope.tst = "w3-red";
        $scope.mfdclear = function(){
            for(var cnt = 0; cnt < $scope.lmfd.length; cnt++) { 
                $scope.lmfd[cnt].selected = "false";
                $scope.lmfd[cnt].selectable = "false";
                $scope.lmfd[cnt].action = "";
                $scope.lmfd[cnt].content.column = 1;
                $scope.lmfd[cnt].content.style = "";
                $scope.lmfd[cnt].content.text = "";
            };
        };
        $scope.underconstruction = function(){
            $scope.lmfd[0].content.text = "Viewing page: "+ $scope.currentview;
            $scope.lmfd[1].content.text = "Select RETURN for MAIN MENU";
            
            console.log("UNDER CONSTRUCTION!");

        }
    // end MFD construct
        
    // db functions to get DATA.
        /*$scope.create = function(){
            console.log("CREATING NEW lorem");
            console.log(db);
            db.serialize(function () {  
                //db.run("CREATE TABLE lorem (info TEXT)");
                var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
                for (var i = 0; i < 10; i++) {
                    stmt.run("Ipsum " + i);
                }
                stmt.finalize();
            });};

        $scope.retreive = function(){
            console.log("RETREIVE lorem");
            console.log(db);
            db.serialize(function () {  
                 db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
                    console.log(row.id + ": " + row.info);
                });
             });        };
        $scope.update = function(){
            console.log("UPDATE lorem");
            console.log(db);
            db.serialize(function () {  
                db.run("UPDATE lorem SET info = ?", "RRR");
                });
            };

        $scope.delete = function(){
            console.log("DELETE lorem");
            console.log(db);
            db.serialize(function () {  
                db.run("DELETE FROM lorem WHERE info = ?", "RRR");
             });        };
        */
        
        $scope.init = function(){
            db.serialize(function () { 
                var mysql = "select * from SCENARIOS_FAULTED_LRUS inner join SCENARIOS_FAULTED_TERMS on (SCENARIOS_FAULTED_LRUS.SCENARIO_LRU_ID = SCENARIOS_FAULTED_TERMS.SCENARIO_LRU_ID) where scenario_id = " + $scope.scenarioid ;
                db.each(mysql, function(err,row){ 
                    if(err) {
                        console.log(err); 
                    } else {
                        console.log("GETTING LRU INFO");
                        console.log(row);
                        $scope.data.push(row); 
                    }; 
                });
            }); };
        
           $scope.getBitmask = function(){
            console.log("$scolojpope.terms.length:"+ $scope.terms.length);
           /* db.serialize(function () {  
                console.log("$scope.lru.length:" + $scope.lru.length);
                console.log($scope.data);
                var cnt = 8;
                for (var x = 0; x < $scope.lru.length; x++){
                    //console.log(x + "$scope.lru:" + $scope.lru[x]);
                    console.log($scope.lru[x]);
                   // console.log($scope.lru[x]["TERM.ARINC_LABEL"]);
                    //console.log($scope.lru[x]["TERM.SDI"]);
                   // console.log($scope.lru[x]["SCENARIOS_FAULTED_LRUS.FLIGHT_LEG_NUM"] );
                 //  var mySQL = "SELECT TERM.ARINC_LABEL, TERM.SDI, TERM.BIT_MASK FROM SCENARIOS INNER JOIN (SCENARIOS_FAULTED_LRUS INNER JOIN (SCENARIOS_FAULTED_TERMS INNER JOIN TERM ON (SCENARIOS_FAULTED_TERMS.TERM_MSG_PRIORITY = TERM.MSG_PRIORITY) AND (SCENARIOS_FAULTED_TERMS.TERM_MNEMONIC = TERM.LRU_MNEMONIC)) ON (SCENARIOS_FAULTED_LRUS.SCENARIO_LRU_ID = SCENARIOS_FAULTED_TERMS.SCENARIO_LRU_ID) AND (SCENARIOS_FAULTED_LRUS.SCENARIO_LRU_ID = SCENARIOS_FAULTED_TERMS.SCENARIO_LRU_ID) AND (SCENARIOS_FAULTED_LRUS.SCENARIO_LRU_ID = SCENARIOS_FAULTED_TERMS.SCENARIO_LRU_ID)) ON SCENARIOS.SCENARIO_ID = SCENARIOS_FAULTED_LRUS.SCENARIO_ID WHERE (((TERM.ARINC_LABEL)='"+$scope.lru[x]["TERM.ARINC_LABEL"]+"') AND ((TERM.SDI)='"+$scope.lru[x]["TERM.SDI"]+"') AND ((SCENARIOS.SCENARIO_ID)='"+ $scope.scenarioid + "') AND ((SCENARIOS_FAULTED_LRUS.IS_HISTORY)='0')) AND ((SCENARIOS_FAULTED_LRUS.FLIGHT_LEG_NUM)='"+ $scope.lru[x]["SCENARIOS_FAULTED_LRUS.FLIGHT_LEG_NUM"] + "'))";
                     var mysql = "Select TERM.LRU_MNEMONIC, TERM.MSG_PRIORITY, TERM.ARINC_LABEL, TERM.SDI, TERM.OPERATOR, TERM.BIT_MASK, TERM.BIT_FAULT, TERM.DESCRIPTION From TERM Where TERM.LRU_MNEMONIC = 'RIU2' And TERM.MSG_PRIORITY = '9'";
                     
                     console.log($scope.data);
                     //console.log(mysql);
                     db.each(mysql, function(err,row){ 
                         console.log("BBBBBBit");
                         console.log(row);
                        $scope.lmfd[cnt].content.text = row.ARINC_LABEL + " " + row.TERM.BIT_MASK;
                        cnt++;
                    });
                }; 
        });*/ };
        
        $scope.getScenarios = function(){
            console.log("GETTING SCENARIOS");
            $scope.mfdclear();
            db.serialize(function () {  
                db.all('SELECT * FROM scenarios ', function(err,row){ 
                    if(err) {
                        console.log(err);
                    }
                    console.log(row);
                    for (var r in row) {
                        $scope.lmfd[r].content.style = "amber";$scope.lmfd[r].selectable = true;$scope.lmfd[r].content.text = "[" + row[r].SCENARIO_ID +"] "+ row[r].SCENARIO_NAME;
                    };
                });
             });        };
        $scope.getMdcMenu = function() {
            console.log("MDC MAIN MENU");
			
			    // define function keys
            $scope.lmfd[0].fkey.text = "KEY/";              $scope.lmfd[0].fkey.style = "magenta"; 
            $scope.lmfd[1].fkey.text = "FUNCTION";          $scope.lmfd[1].fkey.style = "cyan";
            $scope.lmfd[2].fkey.text = "----------------";   $scope.lmfd[2].fkey.style = "cyan";
            $scope.lmfd[3].fkey.text = "JOY-UP";            $scope.lmfd[3].fkey.style = "magenta";
            $scope.lmfd[4].fkey.text = "UP";                $scope.lmfd[4].fkey.style = "cyan";
            $scope.lmfd[5].fkey.text = "-";                  $scope.lmfd[5].fkey.style = "cyan";
            $scope.lmfd[6].fkey.text = "JOY-DOWN";          $scope.lmfd[6].fkey.style = "magenta";
            $scope.lmfd[7].fkey.text = "DOWN";              $scope.lmfd[7].fkey.style = "cyan";
            $scope.lmfd[8].fkey.text = "-";                  $scope.lmfd[8].fkey.style = "cyan";
            $scope.lmfd[9].fkey.text = "ENTER";             $scope.lmfd[9].fkey.style = "magenta";
            $scope.lmfd[10].fkey.text = "SELECT";           $scope.lmfd[10].fkey.style = "cyan";
            $scope.lmfd[11].fkey.text = "-";                 $scope.lmfd[11].fkey.style = "cyan";
            $scope.lmfd[12].fkey.text = "TFC";              $scope.lmfd[12].fkey.style = "magenta";
            $scope.lmfd[13].fkey.text = "EXIT";             $scope.lmfd[13].fkey.style = "cyan";
            $scope.lmfd[14].fkey.text = "-"; $scope.lmfd[14].fkey.style = "cyan";
            $scope.lmfd[15].fkey.text = "-"; $scope.lmfd[15].fkey.style = "cyan";
            $scope.lmfd[16].fkey.text = "-"; $scope.lmfd[16].fkey.style = "cyan";
            $scope.lmfd[17].fkey.text = "-"; $scope.lmfd[17].fkey.style = "cyan";
            $scope.lmfd[18].fkey.text = "-"; $scope.lmfd[18].fkey.style = "cyan";
            $scope.lmfd[19].fkey.text = "-"; $scope.lmfd[19].fkey.style = "cyan";
            $scope.lmfd[20].fkey.text = "-"; $scope.lmfd[20].fkey.style = "cyan";
            $scope.lmfd[21].fkey.text = "-"; $scope.lmfd[21].fkey.style = "cyan";
            $scope.lmfd[22].fkey.text = "-"; $scope.lmfd[22].fkey.style = "cyan";
            $scope.lmfd[23].fkey.text = "-"; $scope.lmfd[23].fkey.style = "cyan";
            $scope.lmfd[24].fkey.text = "-"; $scope.lmfd[24].fkey.style = "cyan";
            $scope.lmfd[25].fkey.text = "-"; $scope.lmfd[25].fkey.style = "cyan";
            
            // define display content
            if($scope.activeselection == undefined) {
                $scope.activeselection = 2;
            }
            $scope.lmfd[$scope.activeselection].selected = true;
            $scope.currentview = "getMdcMenu";
            $scope.lmfd[0].content.style = "white";$scope.lmfd[0].content.text = "MAINTENANCE MAIN MENU";
            $scope.lmfd[1].content.text = "";
            $scope.lmfd[2].content.style = "white";$scope.lmfd[2].selectable = true;$scope.lmfd[2].content.text = "CURRENT FAULTS";$scope.lmfd[2].action = "getCurrentFaults";
            $scope.lmfd[3].content.style = "white";$scope.lmfd[3].selectable = true;$scope.lmfd[3].content.text = "CURRENT SERVICE MESSAGES";$scope.lmfd[3].action = "getCurrentMessages";
            $scope.lmfd[4].content.style = "white";$scope.lmfd[4].selectable = true;$scope.lmfd[4].content.text = "AIRCRAFT HISTORY";$scope.lmfd[4].action = "getAircraftHistory";
            $scope.lmfd[5].content.text = "";
            $scope.lmfd[6].content.style = "white";$scope.lmfd[6].selectable = true;$scope.lmfd[6].content.text = "LRU TEST";$scope.lmfd[6].action = "getLruTest";
            $scope.lmfd[7].content.style = "white";$scope.lmfd[7].selectable = true;$scope.lmfd[7].content.text = "LRU RIGGING";$scope.lmfd[7].action = "getLruRigging";
            $scope.lmfd[8].content.text = "";
            $scope.lmfd[9].content.style = "white";$scope.lmfd[9].selectable = true;$scope.lmfd[9].content.text = "SYSTEM PARAMETER";$scope.lmfd[9].action = "getSystemParameters";
            $scope.lmfd[10].content.style = "white";$scope.lmfd[10].selectable = true;$scope.lmfd[10].content.text = "ATA INDEX";$scope.lmfd[10].action = "getAtaIndex";
            $scope.lmfd[11].content.style = "white";$scope.lmfd[11].selectable = true;$scope.lmfd[11].content.text = "LRU INDEX/OPERATIONS";$scope.lmfd[11].action = "getLruIndexOperation";
            $scope.lmfd[12].content.text = "";
            $scope.lmfd[13].content.style = "white";$scope.lmfd[13].selectable = true;$scope.lmfd[13].content.text = "MDC SETUP";$scope.lmfd[13].action = "getMdcSetup";
            $scope.lmfd[14].content.style = "white";$scope.lmfd[14].selectable = true;$scope.lmfd[14].content.text = "CONFIGURATION DATA";$scope.lmfd[14].action = "getConfigData";
            $scope.lmfd[15].content.text = "";
            $scope.lmfd[16].content.text = "";
            $scope.lmfd[17].content.style = "white";$scope.lmfd[17].selectable = true;$scope.lmfd[17].content.text = "REPORT DOWNLOAD";$scope.lmfd[17].action = "getReportDownload";
            $scope.lmfd[18].content.style = "white";$scope.lmfd[18].selectable = true;$scope.lmfd[18].content.text = "PILOT DATA DOWNLOAD TO DISK";$scope.lmfd[18].action = "getPilotDataDownloadToDisk";
            $scope.lmfd[19].content.text = "";
            $scope.lmfd[20].content.text = "";
            $scope.lmfd[21].content.text = "";
            $scope.lmfd[22].content.style = "cyan"; $scope.lmfd[22].content.text = "ON ANY SUB-PAGE, PUSH LWR FRMT";
            $scope.lmfd[23].content.style = "cyan"; $scope.lmfd[23].content.text = "BUTTON TO RETURN TO MAIN MENU";
            $scope.lmfd[24].content.style = "cyan"; $scope.lmfd[24].content.text = "------------------------------------";
            $scope.lmfd[25].content.text = "";  };
        $scope.getCurrentFaults = function(){
                // define function keys
            $scope.lmfd[0].fkey.text = "KEY/";              $scope.lmfd[0].fkey.style = "magenta"; 
            $scope.lmfd[1].fkey.text = "FUNCTION";          $scope.lmfd[1].fkey.style = "cyan";
            $scope.lmfd[2].fkey.text = "----------------";   $scope.lmfd[2].fkey.style = "cyan";
            $scope.lmfd[3].fkey.text = "JOY-UP";            $scope.lmfd[3].fkey.style = "magenta";
            $scope.lmfd[4].fkey.text = "UP";                $scope.lmfd[4].fkey.style = "cyan";
            $scope.lmfd[5].fkey.text = "-";                  $scope.lmfd[5].fkey.style = "cyan";
            $scope.lmfd[6].fkey.text = "JOY-DOWN";          $scope.lmfd[6].fkey.style = "magenta";
            $scope.lmfd[7].fkey.text = "DOWN";              $scope.lmfd[7].fkey.style = "cyan";
            $scope.lmfd[8].fkey.text = "-";                  $scope.lmfd[8].fkey.style = "cyan";
            $scope.lmfd[9].fkey.text = "ENTER";             $scope.lmfd[9].fkey.style = "magenta";
            $scope.lmfd[10].fkey.text = "SELECT";           $scope.lmfd[10].fkey.style = "cyan";
            $scope.lmfd[11].fkey.text = "-";                 $scope.lmfd[11].fkey.style = "cyan";
            $scope.lmfd[12].fkey.text = "JOY-LEFT";              $scope.lmfd[12].fkey.style = "magenta";
            $scope.lmfd[13].fkey.text = "PREV";             $scope.lmfd[13].fkey.style = "cyan";
			$scope.lmfd[14].fkey.text = "-";                 $scope.lmfd[14].fkey.style = "cyan";
            $scope.lmfd[15].fkey.text = "JOY-RIGHT";              $scope.lmfd[15].fkey.style = "magenta";
            $scope.lmfd[16].fkey.text = "NEXT";             $scope.lmfd[16].fkey.style = "cyan";
			$scope.lmfd[17].fkey.text = "-";                 $scope.lmfd[17].fkey.style = "cyan";
            $scope.lmfd[18].fkey.text = "TR/WX";              $scope.lmfd[18].fkey.style = "magenta";
            $scope.lmfd[19].fkey.text = "RETURN";             $scope.lmfd[19].fkey.style = "cyan";
            $scope.lmfd[20].fkey.text = "-"; $scope.lmfd[20].fkey.style = "cyan";
            $scope.lmfd[21].fkey.text = "-"; $scope.lmfd[21].fkey.style = "cyan";
            $scope.lmfd[22].fkey.text = "-"; $scope.lmfd[22].fkey.style = "cyan";
            $scope.lmfd[23].fkey.text = "-"; $scope.lmfd[23].fkey.style = "cyan";
            $scope.lmfd[24].fkey.text = "-"; $scope.lmfd[24].fkey.style = "cyan";
            $scope.lmfd[25].fkey.text = "-"; $scope.lmfd[25].fkey.style = "cyan";
            
            // define display content
			
			
			$scope.currentview = "getCurrentFaults"; 
            db.serialize(function () {  
                $scope.mfdclear();
                var mySQL = "Select SCENARIOS_FAULTED_LRUS.SCENARIO_LRU_ID,   (SCENARIOS.SCENARIO_ID),   (SCENARIOS_FAULTED_LRUS.IS_HISTORY),  LRU.LRU_NAME,  ATA.ATA_NAME,  LRU.ATA_CHAPTER,  LRU.COMP_ID,  LRU.STATUS,  LRU.FAULT_MSG,  LRU.MSG_TYPE From  SCENARIOS Inner Join   SCENARIOS_FAULTED_LRUS     On SCENARIOS.SCENARIO_ID = SCENARIOS_FAULTED_LRUS.SCENARIO_ID Inner Join   LRU     On SCENARIOS_FAULTED_LRUS.EQ_ID = LRU.EQ_ID Inner Join   ATA On LRU.ATA_CHAPTER = ATA.ATA_CHAPTER Where (SCENARIOS.SCENARIO_ID) = '" + $scope.scenarioid + "' And (SCENARIOS_FAULTED_LRUS.IS_HISTORY) = 0 And LRU.MSG_TYPE = 'Fault Message' ORDER BY LRU.ATA_CHAPTER, LRU.LRU_NAME";
                $scope.pagenumber = 1;
				$scope.pageof = 10;
				
				$scope.lmfd[0].selectable = false;$scope.lmfd[0].content.style = "cyan"; $scope.lmfd[0].content.text = "CURRENT FAULTS";
                $scope.lmfd[1].selectable = false;$scope.lmfd[1].content.text = "";
                $scope.lmfd[2].selectable = false;$scope.lmfd[2].content.style = "cyan"; $scope.lmfd[2].content.text = "ATA/LRU/STATUS/FAULT MESSAGE";
                $scope.lmfd[3].selectable = false;$scope.lmfd[3].content.style = "cyan"; $scope.lmfd[3].content.text = "-------------------------------------";
                var cnt = 4;

                db.each(mySQL, function(err,row){ 
                    console.log("FAULTS:");
                    console.log(row);
                    $scope.faults.push(row);
                    $scope.lmfd[cnt].action = "getAdvancedDiagnostics";$scope.lmfd[cnt].selectable = true;$scope.lmfd[cnt].content.style = 'white';$scope.lmfd[cnt].content.text = "ATA" + row.ATA_CHAPTER + " " + row.ATA_NAME;
                    cnt++;$scope.lmfd[cnt].content.style = 'amber';$scope.lmfd[cnt].content.text = row.LRU_NAME + " " + row.COMP_ID;
                    cnt++;$scope.lmfd[cnt].content.style = 'white';$scope.lmfd[cnt].content.text = row.STATUS;
                    cnt++;$scope.lmfd[cnt].content.style = 'white';$scope.lmfd[cnt].content.text = row.FAULT_MSG;
                    cnt++;$scope.lmfd[cnt].content.text = "---";
                    cnt++;
                });        
                $scope.lmfd[4].selected = true;
                //content.style = 'red';
                $scope.lmfd[5].content.style = 'red';
				$scope.lmfd[23].selectable = false;$scope.lmfd[23].content.style = "cyan"; $scope.lmfd[23].content.text = "-------------------------------------";
				
             });
           
              };
        $scope.getAdvancedDiagnostics = function(){
            $scope.mfdclear();
            $scope.currentview = "getAdvancedDiagnostics";
            $scope.currentfault = $scope.faults[$scope.faultselected];
            $scope.scenariolruid = $scope.currentfault['SCENARIO_LRU_ID'];
            console.log("ADVANCED DIAGNOSTIC");
            if ($scope.lruselected == "") { $scope.lruselected = 0;};
            db.serialize(function () {  
                $scope.mfdclear();
                var mySQL = "SELECT LRU.LRU_NAME, LRU.STATUS, LRU.ATA_CHAPTER, ATA.ATA_NAME, LRU.COMP_ID, SCENARIOS_FAULTED_LRUS.OCCURENCE_COUNT, SCENARIOS_FAULTED_LRUS.FLIGHT_LEG_NUM, SCENARIOS_FAULTED_LRUS.PHASE_OF_FLIGHT, SCENARIOS_FAULTED_LRUS.TIME_OF_FAULT, LRU.FAULT_MSG, LRU.EQ_ID, LRU.HELPTIP, LRU.REPORTING, SCENARIOS_FAULTED_LRUS.IS_HISTORY FROM SCENARIOS INNER JOIN ((ATA INNER JOIN LRU ON ATA.ATA_CHAPTER = LRU.ATA_CHAPTER) INNER JOIN SCENARIOS_FAULTED_LRUS ON LRU.EQ_ID = SCENARIOS_FAULTED_LRUS.EQ_ID)        ON SCENARIOS.SCENARIO_ID = SCENARIOS_FAULTED_LRUS.SCENARIO_ID WHERE (((SCENARIOS_FAULTED_LRUS.SCENARIO_LRU_ID)='" + $scope.faults[$scope.lruselected]['SCENARIO_LRU_ID'] + "'));";
                db.get(mySQL, function(err,row){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("LRU:");
                        $scope.currentlru = row;
                        console.log($scope.currentlru);
                        $scope.lmfd[0].content.style = "cyan";$scope.lmfd[0].content.text = "ADVANCED DIAGNOSTICS";
                        $scope.lmfd[1].content.style = "cyan";$scope.lmfd[1].content.text = "LRU: " + row["LRU.LRU_NAME"];
                        $scope.lmfd[2].content.style = "cyan";$scope.lmfd[2].content.text = "LRU STATUS: " + row["LRU.STATUS"];
                        $scope.lmfd[3].content.style = "cyan";$scope.lmfd[3].content.text = "ATA: " + row["LRU.ATA_CHAPTER"] + " " + row["ATA.ATA_NAME"];
                        $scope.lmfd[4].content.style = "cyan";$scope.lmfd[4].content.text = "COMP ID: " + row["LRU.COMP_ID"];
                        $scope.lmfd[5].content.text = ".";
                        $scope.lmfd[6].content.text = ".";
                        $scope.lmfd[7].selected = true; $scope.lmfd[7].action = "getDetailedDiagnosticData";$scope.lmfd[7].content.style = "cyan";$scope.lmfd[7].selectable = true; $scope.lmfd[7].content.text = "VIEW DETAILED DIAGNOSTIC DATA";
                        $scope.lmfd[8].content.style = "cyan";$scope.lmfd[8].content.text = "-------------------------------------";
                        $scope.lmfd[9].content.style = "amber";$scope.lmfd[9].content.text = row["LRU.FAULT_MSG"];
                        $scope.lmfd[10].content.text = ".";
                        $scope.lmfd[11].content.style = "white";$scope.lmfd[11].content.text = " . . . . . ID#=B3-" + row["LRU.EQ_ID"];
                        $scope.lmfd[12].content.style = "white";$scope.lmfd[12].content.text = row["LRU.HELPTIP"].substring(0,31);
                        $scope.lmfd[13].content.style = "white";$scope.lmfd[13].content.text = row["LRU.HELPTIP"].substring(31,62);
                        $scope.lmfd[14].content.style = "white";$scope.lmfd[14].content.text = row["LRU.HELPTIP"].substring(62,93);
                        $scope.lmfd[15].content.style = "white";$scope.lmfd[15].content.text = row["LRU.HELPTIP"].substring(93,124);
                        $scope.lmfd[16].content.style = "white";$scope.lmfd[16].content.text = row["LRU.HELPTIP"].substring(124,155);
                        $scope.lmfd[17].content.style = "white";$scope.lmfd[17].content.text = row["LRU.HELPTIP"].substring(155,186);
                        $scope.lmfd[18].content.style = "white";$scope.lmfd[18].content.text = row["LRU.HELPTIP"].substring(186,217);
                        $scope.lmfd[19].content.style = "white";$scope.lmfd[19].content.text = row["LRU.HELPTIP"].substring(217,248);
                        $scope.lmfd[20].content.style = "white";$scope.lmfd[20].content.text = row["LRU.HELPTIP"].substring(248,279);
                        $scope.lmfd[21].content.style = "white";$scope.lmfd[21].content.text = row["LRU.HELPTIP"].substring(279,310);
                        $scope.lmfd[22].content.style = "white";$scope.lmfd[22].content.text = row["LRU.HELPTIP"].substring(310,341);
                        $scope.lmfd[23].content.style = "white";$scope.lmfd[23].content.text = row["LRU.HELPTIP"].substring(341,372);
                        $scope.lmfd[24].content.style = "cyan";$scope.lmfd[24].content.text = "------------------------------------";
                        $scope.lmfd[25].content.text = "";
                        $scope.lmfd[26].content.text = "";
                    };
                });
            });  };


        $scope.getDetailedDiagnosticData = function(){
            console.log("DETAILED DIAGNOSTIC DATA");
            $scope.mfdclear();
            $scope.currentview = "getDetailedDiagnosticData";
            $scope.lmfd[0].content.style ="cyan";$scope.lmfd[0].content.text = "DETAILED DIAGNOSTIC DATA";
            $scope.lmfd[1].content.style ="amber"; $scope.lmfd[1].content.text = "ATA" + $scope.currentlru['LRU.ATA_CHAPTER'] + " " + $scope.currentlru['ATA.ATA_NAME'];
            $scope.lmfd[2].content.style ="amber"; $scope.lmfd[2].content.text = $scope.currentlru["LRU.LRU_NAME"];
            $scope.lmfd[3].content.style ="amber"; $scope.lmfd[3].content.text = " " + $scope.currentlru["LRU.FAULT_MSG"];
            $scope.lmfd[4].content.style ="white"; $scope.lmfd[4].selected = true;$scope.lmfd[4].selectable = true; $scope.lmfd[4].content.text = "REFRESH (temp DATA READER action)";$scope.lmfd[4].action = "getDataReader";
            $scope.lmfd[5].content.style ="white"; $scope.lmfd[5].selectable = true; $scope.lmfd[5].content.text = "DATA FORMAT : " + "BINARY ( 31 - 09 )";
            $scope.lmfd[6].content.style ="white"; $scope.lmfd[6].selectable = true; $scope.lmfd[6].content.text = "DATA VIEW   : " + "DATA FROM LRU";
            $scope.lmfd[7].content.style ="cyan"; $scope.lmfd[7].content.text = "-------------------------------------";
            
            db.serialize(function () {  
                // find equation for lru
                var mysql = "select * from FAULTEQU_LST where Field15 = 'B3-" + $scope.currentlru['LRU.EQ_ID'] + "'";
                db.each(mysql, function(err,row){
                    if(err) {
                        console.log(err);
                    } else {
                    //getting equation from FaultEquation table
                    $scope.lruequation = row['Field13'];
                    console.log($scope.lruequation);
                    };
                }); 
                // find equation terms
                var cnt = 7;
                var mysql = "select * from SCENARIOS_FAULTED_TERMS where SCENARIO_LRU_ID = '" + $scope.scenariolruid +"'";
                db.each(mysql, function(err,row){
                    if(err) {
                        console.log(err);
                    } else {    
                        console.log('TERM_MNEMONIC:' + row["TERM_MNEMONIC"] + ' ' + 'TERM_MSG_PRIORITY:' + row["TERM_MSG_PRIORITY"]);
                        $scope.terms.push(row);
                        console.log($scope.terms.length);
                        console.log("TERM PUSHED.");
                        console.log(row);
                        db.serialize(function() {
                            
                            var ysql = "SELECT LRU_MNEMONIC, MSG_PRIORITY, ARINC_LABEL, IOC_BUS, SDI, OPERATOR, BIT_MASK, BIT_FAULT, DESCRIPTION, RELATED_EQUATIONS FROM TERM WHERE LRU_MNEMONIC = '"+ row["TERM_MNEMONIC"] +"' and MSG_PRIORITY = '"+ row["TERM_MSG_PRIORITY"] +"';";
                            console.log(ysql);
                            db.each(ysql, function(err,row){
                                if(err) {
                                    console.log(err);
                                } else {
                                    cnt++;$scope.lmfd[cnt].content.text = row['ARINC_LABEL']+ " " + row['BIT_MASK']+ " " + row['SDI'] + " " + row['LRU_MNEMONIC'] + row['MSG_PRIORITY'];
                                    console.log(row['ARINC_LABEL']+ " " + row['BIT_MASK']+ " " + row['SDI']);
                                    console.log(row);
                                };
                            });
                        });
                    };  // end for all TERMS  
                });
           // find scenario terms
            });
        };
     
        $scope.getfaultsdetail = function(){
            console.log("GETTING FAULTS DETAILS");
            $scope.mfdclear();
            $scope.currentview = "getFaultsDetail";
            db.serialize(function () {  
                $scope.lmfd[0].content.text = "DETAILED FAULTS 1/1";
                $scope.lmfd[1].content.text = "";
                $scope.lmfd[2].content.text = "ATA/LRU/STATUS/FAULT MESSAGE";
                $scope.lmfd[3].content.text = "-------------------------------------";
                var cnt = 4;

                var mySQL = "Select LRU.ATA_CHAPTER, LRU.LRU_NAME From SCENARIOS_FAULTED_LRUS Inner Join LRU On SCENARIOS_FAULTED_LRUS.EQ_ID = LRU.EQ_ID Where SCENARIOS_FAULTED_LRUS.SCENARIO_ID = 1008 And SCENARIOS_FAULTED_LRUS.IS_HISTORY = 0 ORDER BY LRU.ATA_CHAPTER ";
                db.each(mySQL, function(err,row){ 
                    $scope.lmfd[cnt].content.text = "ATA CHAPTER:" + row.ATA_CHAPTER + " :: " +row.LRU_NAME;
                    cnt++;
                });
             }); };
        $scope.getDataReader = function(){
            console.log("GET DATA READER");
             $scope.currentview = "getDataReader";
             db.serialize(function () {  
                $scope.lmfd[0].content.text = "DATA READER";
                var cnt = 1;

                var mySQL = "SELECT DISTINCT DATA_DICTIONARY.label2, DATA_DICTIONARY.label2_desc, DATA_DICTIONARY.sdi, DATA_DICTIONARY.bit_9, DATA_DICTIONARY.bit_10, DATA_DICTIONARY.bit_11, DATA_DICTIONARY.bit_12, DATA_DICTIONARY.bit_13, DATA_DICTIONARY.bit_14, DATA_DICTIONARY.bit_15, DATA_DICTIONARY.bit_16, DATA_DICTIONARY.bit_17, DATA_DICTIONARY.bit_18, DATA_DICTIONARY.bit_19, DATA_DICTIONARY.bit_20, DATA_DICTIONARY.bit_21, DATA_DICTIONARY.bit_22, DATA_DICTIONARY.bit_23, DATA_DICTIONARY.bit_24, DATA_DICTIONARY.bit_25, DATA_DICTIONARY.bit_26, DATA_DICTIONARY.bit_27, DATA_DICTIONARY.bit_28, DATA_DICTIONARY.bit_29, DATA_DICTIONARY.bit_30, DATA_DICTIONARY.bit_31, DATA_DICTIONARY.ssm FROM DATA_DICTIONARY WHERE (((DATA_DICTIONARY.REMAP_LABEL)='234') AND ((DATA_DICTIONARY.sub_address)='NA'));";
                db.each(mySQL, function(err,row){ 
                    console.log(row);
                    $scope.lmfd[cnt].selectable = false;
                    $scope.lmfd[cnt].content.text = row["label2"] + " " + row["label2_desc"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text = "10/9:" + "01" + row["sdi"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text = (cnt + 8) + ": " + "0" + " " + row["bit_11"];
                    //cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text = row["bit_10"];
                    //cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text = row["bit_11"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_12"];
                    cnt++;$scope.lmfd[cnt].selectable = false;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_13"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_14"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_15"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_16"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_17"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_18"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_19"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_20"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_21"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_22"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_23"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_24"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_25"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_26"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_27"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_28"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text =  (cnt + 8) + ": " + "0" + " " + row["bit_29"];
                    //cnt++;$scope.lmfd[cnt].content.text = row["DATA_DICTIONARY.bit_30"];
                    //cnt++;$scope.lmfd[cnt].content.text = row["DATA_DICTIONARY.bit_31"];
                    cnt++;$scope.lmfd[cnt].content.style = "white"; $scope.lmfd[cnt].content.text = "31/30:" + "00" + row["ssm"];
                    cnt++;$scope.lmfd[cnt].content.style = "cyan"; $scope.lmfd[cnt].content.text = "-------------------------------------";

                });
             }); };       
        $scope.getCurrentMessages = function(){
            console.log("GETTING MESSAGES");
            $scope.currentview = "getCurrentMessages";
            $scope.mfdclear();$scope.underconstruction();
            return; 
            $scope.mfdclear();
            db.serialize(function () {  

                /*SELECT LRU.ATA_CHAPTER, ATA.ATA_NAME, LRU.LRU_NAME, LRU.COMP_ID, LRU.STATUS, LRU.FAULT_MSG, SCENARIOS_FAULTED_LRUS.SCENARIO_LRU_ID
                FROM SCENARIOS INNER JOIN ((ATA INNER JOIN LRU ON ATA.ATA_CHAPTER = LRU.ATA_CHAPTER) INNER JOIN SCENARIOS_FAULTED_LRUS ON LRU.EQ_ID = SCENARIOS_FAULTED_LRUS.EQ_ID) ON SCENARIOS.SCENARIO_ID = SCENARIOS_FAULTED_LRUS.SCENARIO_ID
                WHERE (((SCENARIOS.SCENARIO_ID)=[@scenario_id]) AND ((LRU.MSG_TYPE)="SERVICE MESSAGE") AND ((SCENARIOS_FAULTED_LRUS.IS_HISTORY)=False))
                ORDER BY LRU.ATA_CHAPTER, LRU.LRU_NAME;
                */
                var mySQL = "Select SCENARIOS_FAULTED_LRUS.SCENARIO_LRU_ID,   (SCENARIOS.SCENARIO_ID),   (SCENARIOS_FAULTED_LRUS.IS_HISTORY),  LRU.LRU_NAME,  ATA.ATA_NAME,  LRU.ATA_CHAPTER,  LRU.COMP_ID,  LRU.STATUS,  LRU.FAULT_MSG,  LRU.MSG_TYPE From  SCENARIOS Inner Join   SCENARIOS_FAULTED_LRUS     On SCENARIOS.SCENARIO_ID = SCENARIOS_FAULTED_LRUS.SCENARIO_ID Inner Join   LRU     On SCENARIOS_FAULTED_LRUS.EQ_ID = LRU.EQ_ID Inner Join   ATA On LRU.ATA_CHAPTER = ATA.ATA_CHAPTER Where (SCENARIOS.SCENARIO_ID) = '" + $scope.scenarioid + "' And (SCENARIOS_FAULTED_LRUS.IS_HISTORY) = 0 And LRU.MSG_TYPE = 'Service Message' ORDER BY LRU.ATA_CHAPTER, LRU.LRU_NAME";
                $scope.lmfd[0].selectable = true;$scope.lmfd[0].content.style = "cyan"; $scope.lmfd[0].content.text = "CURRENT MESSAGES 1/1";
                $scope.lmfd[1].content.text = "";
                $scope.lmfd[2].selectable = true;$scope.lmfd[2].content.style = "cyan"; $scope.lmfd[2].content.text = "ATA/LRU/STATUS/DFDFDFAULT MESSAGE";
                $scope.lmfd[3].selectable = true;$scope.lmfd[3].content.style = "cyan"; $scope.lmfd[3].content.text = "-------------------------------------";
                var cnt = 4;
                db.each(mySQL, function(err,row){ 
                    $scope.lmfd[cnt].content.text = "ATA" + row.ATA_CHAPTER + " " + row.ATA_NAME;
                    cnt++;$scope.lmfd[cnt].content.text = row.LRU_NAME + " " + row.COMP_ID;
                    cnt++;$scope.lmfd[cnt].content.text = row.STATUS;
                    cnt++;$scope.lmfd[cnt].content.text = row.FAULT_MSG;
                    cnt++;$scope.lmfd[cnt].content.text = "---";
                });
             });  };

        $scope.getAircraftHistory = function(){
            console.log("getAircraftHistory");
            $scope.currentview = "getAircraftHistory";
            $scope.mfdclear();$scope.underconstruction();}
        $scope.getLruTest = function(){
            console.log("getLruTest");
            $scope.currentview = "getLruTest";
            $scope.mfdclear();$scope.underconstruction();}
        $scope.getLruRigging = function(){
            console.log("get;;LruRigging");
            $scope.currentview = "getLruRigging";
            $scope.mfdclear();$scope.underconstruction();}
        $scope.getSystemParameters = function(){
            console.log("getSystemParameters");
            $scope.currentview = "getSystemParameters";
            $scope.mfdclear();$scope.underconstruction();}
        $scope.getAtaIndex = function(){
            console.log("getAtaIndex");
            $scope.currentview = "getAtaIndex";
            $scope.mfdclear();$scope.underconstruction();}
        $scope.getLruIndexOperation = function(){
            console.log("getLruIndexOperation");
            $scope.currentview = "getLruIndexOperation";
            $scope.mfdclear();$scope.underconstruction();}
        $scope.getMdcSetup = function(){
            console.log("getMdcSetup");
            $scope.currentview = "getMdcSetup";
            $scope.mfdclear();$scope.underconstruction();}
        $scope.getConfigData = function(){
            console.log("getConfigData");
            $scope.currentview = "getConfigData";
            $scope.mfdclear();$scope.underconstruction();}
        $scope.getReportDownload = function(){
            console.log("getReportDownload");
            $scope.currentview = "getReportDownload";
            $scope.mfdclear();$scope.underconstruction();}
        $scope.getPilotDataDownloadToDisk = function(){
            console.log("getPilotDataDownloadToDisk");
            $scope.currentview = "getPilotDataDownloadToDisk";
            $scope.mfdclear();$scope.underconstruction();}
    
    // end of DATA access functions.
    // PANEL inteactivity
        $scope.down = function(){
            console.log("go DOWN");
            console.log($scope.currentview);
            //find selected item and toggle next selectable to true.
            for(var x = 0; x < $scope.lmfd.length; x++){
                if ($scope.lmfd[x].selected == true) {
                    $scope.lmfd[x].selected = false;
                    x++;
                    for (var y = x; y < $scope.lmfd.length; y++){
                        if ($scope.lmfd[y].selectable == true) {
                           $scope.lmfd[y].selected = true;
                           $scope.activeselection = y;
                           return; 
                        } else {
                            if (y == $scope.lmfd.length - 1){
                                y = 0;
                            };
                        };
                    };
                };
            };   };
        $scope.up = function(){
              for(var x = $scope.lmfd.length-1; x > 0 ; x--){
                if ($scope.lmfd[x].selected == true) {
                    $scope.lmfd[x].selected = false;
                    x--;
                    for (var y = x; y > 0;  y--){
                        
                        if ($scope.lmfd[y].selectable == true) {
                           $scope.lmfd[y].selected = true;
                           $scope.activeselection = y;
                           return; 
                        } else {
                            if (y ==  1){
                                y = $scope.lmfd.length;
                            };
                        };
                    };
                };
               
            }; };
        $scope.select = function(){
            for(var q = 0; q < $scope.lmfd.length ; q++){
                if ($scope.lmfd[q].selected == true) {
                    switch($scope.lmfd[q].action) {
                        case 'getCurrentFaults':
                            $scope.activeselection = q;
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getCurrentFaults();
                            break;
                        case 'getAdvancedDiagnostics':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getAdvancedDiagnostics();
                            break;
                        case 'getDetailedDiagnosticData':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getDetailedDiagnosticData();
                            break;
                        case 'getDataReader':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getDataReader();
                            break;
                        case 'getCurrentMessages':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getCurrentMessages();
                            break;
                        case 'getAircraftHistory':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getAircraftHistory();
                            break;
                        case 'getLruTest':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getLruTest();
                            break;
                        case 'getLruRigging':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getLruRigging();
                            break;
                        case 'getSystemParameters':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getSystemParameters();
                            break;
                        case 'getAtaIndex':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getAtaIndex();
                            break;
                        case 'getLruIndexOperation':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getLruIndexOperation();
                            break;
                        case 'getMdcSetup':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getMdcSetup();
                            break;
                        case 'getConfigData':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getConfigData();
                            break;
                        case 'getReportDownload':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getReportDownload();
                            break;
                        case 'getPilotDataDownloadToDisk':
                            $scope.breadcrumb.push([$scope.currentview, $scope.activeselection]);
                            $scope.getPilotDataDownloadToDisk();
                            break;
                        default:
                        console.log("SHOULD NOT GO HERE: select() -- Default action!" + $scope.lmfd[q].action + "::");
                    };
                };
            };          };
      
      

        $scope.prev = function(){
            console.log("PREV");
        };
        $scope.nxt = function(){
            console.log("NEXT");
        };
        $scope.tab = function(){
            console.log("TAB");
        };
        $scope.return = function(){
            $scope.mfdclear();
            var tmp = $scope.breadcrumb.pop();
            var goto = tmp[0];
            $scope.activeselection = tmp[1];
            console.log("$scope.activeselection:"+ $scope.activeselection);
            console.log(tmp);
            switch(goto) {
                case 'getMdcMenu':
                    $scope.getMdcMenu();
                    break;
                 case 'getCurrentFaults':
                    $scope.getCurrentFaults();
                    break;
                case 'getAdvancedDiagnostics':
                    $scope.getAdvancedDiagnostics();
                    break;
                case 'getDetailedDiagnosticData':
                    $scope.getDetailedDiagnosticData();
                    break;
                case 'getDataReader':
                    $scope.getDataReader();
                    break;
                case 'getCurrentMessages':
                    $scope.getCurrentMessages();
                    break;
                case 'getAircraftHistory':
                     $scope.getAircraftHistory();
                    break;
                case 'getLruTest':
                    $scope.getLruTest();
                    break;
                case 'getLruRigging':
                    $scope.getLruRigging();
                    break;
                case 'getSystemParameters':
                    $scope.getSystemParameters();
                    break;
                case 'getAtaIndex':
                     $scope.getAtaIndex();
                    break;
                case 'getLruIndexOperation':
                    $scope.getLruIndexOperation();
                    break;
                case 'getMdcSetup':
                    $scope.getMdcSetup();
                    break;
                case 'getConfigData':
                     $scope.getConfigData();
                    break;
                case 'getReportDownload':
                    $scope.getReportDownload();
                    break;
                case 'getPilotDataDownloadToDisk':
                     $scope.getPilotDataDownloadToDisk();
                    break;
                default:
                    console.log("RETURN _ default not here -function!")
                    $scope.getMdcMenu();
                    return;
                }
        };
    // end of PANEL inteactivity

    // UTIL functions
        $scope.findselected = function(){
            for (var t=0; t < $scope.lmfd.length; t++){
                if ($scope.lmfd[t].selected == true) {
                    $scope.activeselection = t;
                }
            };
            console.log("find selected - $scope.activeselection:" + $scope.activeselection);
        }
    // end UTIL functions

       
        $scope.count = 1;
  
        $( "#ccp" ).click(function() {
            alert( "Handler for .click() called." );
            mdss.getfaultsdetail();
        });


        $scope.clock = {};
        var updateClock = function() {
            $scope.clock.now = new Date();
            $timeout(function() {
                updateClock();
            }, 1000);
        };
        updateClock();
    });

