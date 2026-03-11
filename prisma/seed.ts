import bcrypt from "bcryptjs";
import {
  DepartmentCode,
  DocumentStatus,
  DocumentType,
  PrismaClient,
  RiskLevel,
  TrainingStatus,
  UserRole,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const facility = await prisma.facility.upsert({
    where: { code: "INTZ-A101" },
    update: {},
    create: {
      code: "INTZ-A101",
      name: "Intizam Gida A101 Hatti",
    },
  });

  const departments = [
    { code: DepartmentCode.MANAGEMENT, name: "Yonetim" },
    { code: DepartmentCode.QUALITY, name: "Kalite ve GGYS" },
    { code: DepartmentCode.PRODUCTION, name: "Uretim" },
    { code: DepartmentCode.WAREHOUSE, name: "Depo ve Sevkiyat" },
    { code: DepartmentCode.PURCHASING, name: "Satin Alma" },
  ];

  for (const department of departments) {
    await prisma.department.upsert({
      where: { code: department.code },
      update: { name: department.name },
      create: department,
    });
  }

  const qualityDepartment = await prisma.department.findUniqueOrThrow({
    where: { code: DepartmentCode.QUALITY },
  });

  const adminPassword = await bcrypt.hash("ChangeMe123!", 10);

  await prisma.user.upsert({
    where: { email: "admin@intizam.local" },
    update: {
      name: "Sistem Yoneticisi",
      password: adminPassword,
      role: UserRole.ADMIN,
      facilityId: facility.id,
      departmentId: qualityDepartment.id,
    },
    create: {
      name: "Sistem Yoneticisi",
      email: "admin@intizam.local",
      password: adminPassword,
      role: UserRole.ADMIN,
      facilityId: facility.id,
      departmentId: qualityDepartment.id,
    },
  });

  const sampleDocuments = [
    {
      code: "PLT-01",
      title: "Gida Guvenligi Politikasi",
      type: DocumentType.POLICY,
      status: DocumentStatus.ACTIVE,
      currentRevision: "0",
    },
    {
      code: "PRS-17",
      title: "Urun Geri Cekme ve Cagirma Proseduru",
      type: DocumentType.PROCEDURE,
      status: DocumentStatus.ACTIVE,
      currentRevision: "0",
    },
    {
      code: "PLN-21",
      title: "Tehlike Kontrol Plani",
      type: DocumentType.PLAN,
      status: DocumentStatus.ACTIVE,
      currentRevision: "0",
    },
  ];

  for (const document of sampleDocuments) {
    await prisma.document.upsert({
      where: { code: document.code },
      update: {
        ...document,
        ownerDepartmentId: qualityDepartment.id,
        facilityId: facility.id,
      },
      create: {
        ...document,
        ownerDepartmentId: qualityDepartment.id,
        facilityId: facility.id,
      },
    });
  }

  const products = [
    { code: "UR-001", name: "Ambalajli Beyaz Peynir", category: "Peynir" },
    { code: "UR-002", name: "Eski Kasar", category: "Peynir" },
    { code: "UR-003", name: "Tereyag", category: "Sut Urunu" },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code },
      update: { ...product, facilityId: facility.id },
      create: { ...product, facilityId: facility.id },
    });
  }

  await prisma.supplier.upsert({
    where: { code: "TED-001" },
    update: {
      name: "Ornek Ambalaj",
      riskLevel: RiskLevel.MEDIUM,
      isApproved: true,
      facilityId: facility.id,
    },
    create: {
      code: "TED-001",
      name: "Ornek Ambalaj",
      riskLevel: RiskLevel.MEDIUM,
      isApproved: true,
      facilityId: facility.id,
    },
  });

  const existingTraining = await prisma.trainingPlan.findFirst({
    where: { title: "HACCP Temel Egitimi" },
  });

  if (!existingTraining) {
    await prisma.trainingPlan.create({
      data: {
        title: "HACCP Temel Egitimi",
        plannedDate: new Date("2026-04-01T09:00:00.000Z"),
        status: TrainingStatus.PLANNED,
        departmentId: qualityDepartment.id,
        facilityId: facility.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
