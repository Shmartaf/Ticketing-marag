class DBHandler {
    async getBoards() {
      return [{
        "_id": "6610006cad7d6abd8d1897c6",
        "color": "#3B82F6",
        "username": "admin",
        "board_name": "Best board 2",
        "users": [
          "f70eb65f-600b-4d6e-84c4-23a45a1d0dcb"
        ],
        "team": "65fd90dcc254096623474ecc",
        "incidents": [
          {
            "_id": "6610006cad7d6abd8d1897c7",
            "complete": true,
            "data": [
              "1970-01-01T00:00:00.000Z",
              "1970-01-01T00:00:00.000Z",
              ""
            ]
          },
          {
            "_id": "66117c1713be104b18235800",
            "complete": true,
            "data": [
              "Emptyddgf",
              "emptyd",
              ""
            ]
          },
          {
            "_id": "6612dc3b09c1282f389da722",
            "complete": true,
            "data": [
              "Emptysddddd",
              "emptyff",
              ""
            ]
          },
          {
            "_id": "6613083e1c4e8f534724a158",
            "data": [
              "",
              "",
              ""
            ],
            "complete": false
          },
          {
            "_id": "661392d0ac16b4e7a3e6fce0",
            "data": [
              "Emptyddsd",
              "",
              ""
            ],
            "complete": false
          },
          {
            "_id": "66139384ac16b4e7a3e6fd30",
            "data": [
              "",
              "Emptyf",
              ""
            ],
            "complete": false
          }
        ],
        "columns": [
          {
            "name": "New Column",
            "type": "text"
          },
          {
            "type": "text",
            "name": "New Column"
          }
        ],
        "__v": 0
      }];
    };
  
    async createBoard(board) {
      return board;
    }
    
    async updateBoard(id, board) {
        const someBoard = {
            "_id": '6608238ac439c4adb28502c3',
            "username": "admin",
            "board_name": "test board create 2",
            "users": [
              "\"94e4794f-b21e-4516-afb2-d0bd787c5376\""
            ],
            "team": "65fda85762fb9b8527c7e4bf",
            "incidents": [
              {
                "_id": "66082ffea8a35afe3476ebda",
                "complete": true,
                "data": [
                  "test",
                  true,
                  "9",
                  "Emptdy"
                ],
                "messages": [
                  {
                    "message": "Hello",
                    "userid": "94e4794f-b21e-4516-afb2-d0bd787c5376",
                    "name": "Test2",
                    "date": "2024-04-09T07:59:49.266Z"
                  },
                  {
                    "message": "Hey",
                    "userid": "94e4794f-b21e-4516-afb2-d0bd787c5376",
                    "name": "Test2",
                    "date": "2024-04-09T08:12:00.215Z"
                  },
                  {
                    "message": "Test",
                    "userid": "f70eb65f-600b-4d6e-84c4-23a45a1d0dcb",
                    "name": "test",
                    "date": "2024-04-09T08:15:23.434Z"
                  },
                  {
                    "message": "Working",
                    "userid": "94e4794f-b21e-4516-afb2-d0bd787c5376",
                    "name": "Test2",
                    "date": "2024-04-09T08:18:19.990Z"
                  },
                  {
                    "message": "fr",
                    "userid": "d86ca512-251f-4710-a593-c3eca70f7aac",
                    "name": "shlomi",
                    "date": "2024-04-09T09:27:06.052Z"
                  }
                ]
              },
              {
                "_id": "660d8e1dfa131540bf1a3614",
                "complete": true,
                "data": [
                  null,
                  true,
                  "2",
                  ""
                ],
                "messages": [
                  {
                    "message": "Hello",
                    "name": "Test2",
                    "date": "2024-04-09T07:50:19.838Z",
                    "userid": "94e4794f-b21e-4516-afb2-d0bd787c5376"
                  }
                ]
              },
              {
                "_id": "660d8e1dfa131540bf1a3615",
                "complete": false,
                "data": [
                  null,
                  true,
                  "",
                  ""
                ]
              },
              {
                "_id": "660d8e1dfa131540bf1a3616",
                "complete": true,
                "data": [
                  null,
                  null,
                  "",
                  ""
                ]
              },
              {
                "_id": "660db6d12823bbddf9caa205",
                "complete": false,
                "data": [
                  null,
                  null,
                  null,
                  ""
                ]
              },
              {
                "_id": "661179c909ea5a2ba5ef0202",
                "complete": false,
                "data": [
                  null,
                  null,
                  null,
                  ""
                ]
              },
              {
                "_id": "661179c909ea5a2ba5ef0203",
                "complete": false,
                "data": [
                  null,
                  null,
                  null,
                  ""
                ]
              },
              {
                "_id": "6614e7f5c9b1a5a07008bb58",
                "data": [
                  "",
                  "",
                  "",
                  ""
                ],
                "complete": false
              },
              {
                "_id": "66150a060753753c5f1a1c4a",
                "data": [
                  "",
                  "",
                  "",
                  "",
                  ""
                ],
                "complete": false
              }
            ],
            "__v": 0,
            "color": "#3B82F6",
            "columns": [
              {
                "name": "dsa",
                "type": "Date"
              },
              {
                "name": "cds",
                "type": "Boolean"
              },
              {
                "name": "sx",
                "type": "Number"
              },
              {
                "type": "text",
                "name": "New Column"
              },
              {
                "type": "text",
                "name": "New Column"
              }
            ]
        };
        
        const updatedBoard = { ...someBoard, ...board };
        return updatedBoard;
    }
    
    async getTeams() {
        const teams = [
            {
              "_id": "65fd948fff56b8017055baae",
              "team_name": "shmartaf",
              "users": [
                "7f8875f8-f4ed-48f8-9836-183c8d6f8cae",
                "2582bde3-12f4-4ada-86e6-bf2bc0cd7ec8",
                "e51e5401-14da-435e-b699-53c39391abbf"
              ],
              "boards": [
                "6608238ac439c4adb28502c3",
                "660dae5fad7d6abd8d18975e",
                "660dae82ad7d6abd8d18976e"
              ],
              "__v": 2
            },
            {
              "_id": "66100044ad7d6abd8d1897a0",
              "team_name": "Super team new",
              "users": [
                "9315ffc7-91bf-4ffe-95ad-109e279d45da",
                "4a0db9cd-ab83-4dbe-bd53-5e6ce60aaaf4"
              ],
              "boards": [
                "660dae96ad7d6abd8d189772",
                "660daea5ad7d6abd8d18977e",
                "660daea6ad7d6abd8d189782"
              ],
              "__v": 0
            },
            {
              "_id": "66110709d03e341bbed19b5c",
              "team_name": "it",
              "users": [
                "61f09f79-70df-4de0-8f97-6c082712effc",
                "d86ca512-251f-4710-a593-c3eca70f7aac"
              ],
              "boards": [
                "660daea6ad7d6abd8d189786",
                "660daea6ad7d6abd8d18978a"
              ],
              "__v": 0
            },
            {
              "_id": "66110886d03e341bbed19b60",
              "team_name": "team_fix",
              "users": [
                "767aaaa9-7677-4c1c-8db2-261b8b300357",
                "2c5d91fc-8946-4151-ba5e-734c99fbd1fb"
              ],
              "boards": [
                "660daea6ad7d6abd8d18978e",
                "660daea6ad7d6abd8d189792"
              ],
              "__v": 0
            },
            {
              "_id": "66110904d03e341bbed19b62",
              "team_name": "team_fix2",
              "users": [
                "f70eb65f-600b-4d6e-84c4-23a45a1d0dcb",
                "6d0e444a-1489-4b94-92c3-de6b1a3e6086"
              ],
              "boards": [
                "660daea7ad7d6abd8d189796",
                "660daea7ad7d6abd8d18979a"
              ],
              "__v": 0
            },
            {
              "_id": "6611098bd03e341bbed19b64",
              "team_name": "team_sunday",
              "users": [
                "061e6a6e-5855-4a87-9d95-bed3efa37a08",
                "a2a605b6-2fba-4925-9c74-6a9a2fab599f",
                "a64f77ca-0a89-4cac-8c06-22dcf36caba9"
              ],
              "boards": [
                "6610006cad7d6abd8d1897c6",
                "660dafa52823bbddf9caa167"
              ],
              "__v": 0
            }
          ]
        return teams;
    }

    async createTeam(team) {
        return team;
    }

    async getAllAccounts() {
        return([
            {
            "_id": "65fda85762fb9b8527c7e4bf",
            "account_name": "shenkar2",
            "teams": [
              "65fd948fff56b8017055baae",
              "66100044ad7d6abd8d1897a0",
              "66110709d03e341bbed19b5c"
            ],
            "__v": 0
          },
          {
            "_id": "66110765d03e341bbed19b5e",
            "account_name": "google",
            "teams": [
              "66110886d03e341bbed19b60",
              "66110904d03e341bbed19b62",
              "6611098bd03e341bbed19b64"
            ],
            "__v": 0
          }
        ]);
    }
    async getAccountByUserId(userId) {
        const account = [
            {
              "_id": "65fda85762fb9b8527c7e4bf",
              "account_name": "shenkar2",
              "teams": [
                "65fd948fff56b8017055baae",
                "66100044ad7d6abd8d1897a0",
                "66110709d03e341bbed19b5c"
              ],
              "__v": 0
            }
        ];
        return account;
    }
    async createAccount(account) {
        return account;
    }

    async getNotifications() {
        const notifications = [
            {
              "_id": "661179c909ea5a2ba5ef0202",
              "notification_type": "new_board",
              "notification_data": {
                "_id": "661179c909ea5a2ba5ef0202"
              },
              "__v": 0
            },
            {
              "_id": "661179c909ea5a2ba5ef0203",
              "notification_type": "new_board",
              "notification_data": {
                "_id": "661179c909ea5a2ba5ef0203"
              },
              "__v": 0
            }
          ]
        return notifications;
    }
  }
  
  module.exports = DBHandler;
  