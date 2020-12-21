CREATE TABLE IF NOT EXISTS `User` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  password varchar(64) NOT NULL,
  name varchar(255) NOT NULL,
  phone varchar(25) NOT NULL,
  active BOOLEAN DEFAULT true,
  UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `User_Login` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    token varchar(64) NOT NULL,
    valid_untill DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `Debt` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  owner int NOT NULL,
  owe_to int NOT NULL,
  value double NOT NULL,
  active BOOLEAN DEFAULT true,
  FOREIGN KEY (owner) REFERENCES User(id),
  FOREIGN KEY (owe_to) REFERENCES User(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `Payment` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  debt_id int NOT NULL,
  value double NOT NULL,
  FOREIGN KEY (debt_id) REFERENCES Debt(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;