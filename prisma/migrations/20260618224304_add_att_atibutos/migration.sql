-- AlterTable
CREATE SEQUENCE imagensprojetos_id_seq;
ALTER TABLE "ImagensProjetos" ALTER COLUMN "id" SET DEFAULT nextval('imagensprojetos_id_seq');
ALTER SEQUENCE imagensprojetos_id_seq OWNED BY "ImagensProjetos"."id";

-- AlterTable
CREATE SEQUENCE projetos_id_seq;
ALTER TABLE "Projetos" ALTER COLUMN "id" SET DEFAULT nextval('projetos_id_seq');
ALTER SEQUENCE projetos_id_seq OWNED BY "Projetos"."id";
