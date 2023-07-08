import { Database, Table, Schema, InputFormat, DataFormat } from '@aws-cdk/aws-glue-alpha';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';


export class GlueStack extends Stack {

public readonly glueDatabase: Database;
public readonly surveyGlueTable: Table;
public readonly medicationGlueTable: Table;

constructor(scope: Construct, id: string, processedDataBucket: Bucket, props?: StackProps) {
    super(scope, id, props);

    this.glueDatabase = new Database(this, 'ParkinsonsGlueTable', {
        databaseName: 'parkinsons_database',
    });

    this.surveyGlueTable = new Table(this, 'SurveyGlueTable', {
        tableName: 'survey_table',
        columns: [
            {
                name: "survey_id",
                type: Schema.STRING,
            },
            {
                name: "study_id",
                type: Schema.STRING,
            },
            {
                name: "time",
                type: Schema.STRING,
            },
            {
                name: "is_symptoms_from_earlier_time",
                type: Schema.STRING,
            },
            {
                name: "patient_id",
                type: Schema.STRING,
            },
            {
                name: "device_id",
                type: Schema.STRING,
            },
            {
                name: "trial_id",
                type: Schema.STRING,
            },
            {
                name: "tremor",
                type: Schema.STRING,
            },
            {
                name: "weakness",
                type: Schema.STRING,
            },
            {
                name: "slowness-of-movement",
                type: Schema.STRING,
            },
            {
                name: "balance-problems",
                type: Schema.STRING,
            },
            {
                name: "speech-difficulty",
                type: Schema.STRING,
            },
            {
                name: "general-stiffness",
                type: Schema.STRING,
            },{
                name: "muscle-cramping",
                type: Schema.STRING,
            },
            {
                name: "reduced-dexterity",
                type: Schema.STRING,
            },
            {
                name: "difficulty-getting-out-of-chair",
                type: Schema.STRING,
            },
            {
                name: "mood-changes",
                type: Schema.STRING,
            },
            {
                name: "anxiety",
                type: Schema.STRING,
            },
            {
                name: "experience-panic-attack",
                type: Schema.STRING,
            },
            {
                name: "cloudy-mind",
                type: Schema.STRING,
            },
            {
                name: "abdominal-discomfort",
                type: Schema.STRING,
            },
            {
                name: "numbness",
                type: Schema.STRING,
            },
            {
                name: "sweating",
                type: Schema.STRING,
            },
            {
                name: "experience-hot-cold",
                type: Schema.STRING,
            },
            {
                name: "pain",
                type: Schema.STRING,
            },
            {
                name: "aching",
                type: Schema.STRING,
            },
        ],
        database: this.glueDatabase,
        dataFormat: DataFormat.CSV,
        bucket: processedDataBucket,
        s3Prefix: 'trials',
        partitionIndexes: [{
            indexName: 'survey-index',
            keyNames: [
                "trial_id", "patient_id", "file_type", "study_id", "content_type"
            ],
        }],
    });

    this.medicationGlueTable = new Table(this, 'MedicationGlueTable', {
        tableName: 'medication_table',
        columns: [
            {
                name: "study_id",
                type: Schema.STRING,
            },
            {
                name: "medication_time",
                type: Schema.STRING,
            },
            {
                name: "patient_id",
                type: Schema.STRING,
            },
            {
                name: "device_id",
                type: Schema.STRING,
            },
            {
                name: "trial_id",
                type: Schema.STRING,
            },
            
        ],
        database: this.glueDatabase,
        dataFormat: DataFormat.CSV,
        bucket: processedDataBucket,
        s3Prefix: 'trials',
        partitionIndexes: [{
            indexName: 'medication-index',
            keyNames: [
                "trial_id", "patient_id", "file_type", "study_id", "content_type"
            ],
        }],
    });

  }
}
