var mysql = require('mysql');

// configuration =================
const db = mysql.createPool({
  connectionLimit: 100,
  host: 'production.c3qdnx3xy72i.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: '$p1nn3k13',
  database: 'event_prog',
  port: '3306',
});

const detail = async (req, res) => {
  var array = [];
  var acc_id = req.params.eventid.toUpperCase().trim();
  console.log(acc_id.trim());

  query = "SELECT * FROM persons WHERE acc_no = ?";
  query2 = "UPDATE event_prog.persons SET status=1 WHERE acc_no=?";
  values = [acc_id];
  array = await db.query(query, values, (err, result) => {
    if (!result.length == 0) {
      let resp = {
        "version": "v2",
        "content": {
          "messages": [
            {
              "type": "image",
              "url": "https://dezzon.s3-ap-southeast-1.amazonaws.com/" + acc_id + ".png"
            }
          ],
          "actions": [
            {
              "action": "add_tag",
              "tag_name": "QR delivered",
            }
          ],
          "quick_replies": []
        }
      }
      db.query(query2, values, (err, result) => {
        console.log(result);
        
        console.log("updated--"+acc_id);
      })
      res.send(resp).status(200);
    } else {
      let resp = {
        "version": "v2",
        "content": {
          "messages": [
            {
              "type": "text",
              "buttons": [
                {
                  "type": "flow",
                  "caption": "Go",
                  "target": "content20200310221731_949714"
                }
              ]
            }
          ],
          "actions": [],
          "quick_replies": []
        }
      }

      res.send(resp).status(200);
    }

  });
}

module.exports = { detail };