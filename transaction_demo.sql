USE social_media_app;


START TRANSACTION;


SAVEPOINT before_post_creation;

INSERT INTO Post (user_id, content, visibility) 
VALUES (1, 'Just discovered a new hidden library! #adventure #exploring', 'public');


SET @new_post_id = LAST_INSERT_ID();


INSERT INTO HashTag (tag_name) VALUES ('adventure') ON DUPLICATE KEY UPDATE tag_name=tag_name;
INSERT INTO HashTag (tag_name) VALUES ('exploring') ON DUPLICATE KEY UPDATE tag_name=tag_name;

INSERT INTO Post_HashTag (post_id, hashtag_id) 
SELECT @new_post_id, hashtag_id FROM HashTag WHERE tag_name IN ('adventure', 'exploring');


COMMIT;