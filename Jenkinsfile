pipeline {
    agent any
    tools { nodejs "nodejs" }
    environment {
        dockerImage = ''
        VERCEL_TOKEN = credentials('vercel-token')
        VERCEL_ORG_ID = credentials('vercel-org-id')
        VERCEL_PROJECT_ID = credentials('vercel-prj-id')
        SONAR_TOKEN = credentials('sonarcloud-token')
        SONAR_PROJECT_KEY = 'nghminh2002_sit-753-task6-2'
        // SONAR_ORG = 'nghminh2002'
        // SONAR_TOOL = tool name: 'SonnarCloud', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    }
    stages {
        // stage('Build') {
        //     steps {
        //         sh 'npm install'
        //         echo "Run build to check if the code is valid"
        //         sh 'npm run build'
        //         echo "Build Docker Image"
        //         script {
        //             dockerImage = docker.build("millynguyen/milly-test:${env.BUILD_ID}")
        //         }
        //     }
        // }
        // stage('Test') {
        //     steps {
        //         echo "Run unit tests with Jest"
        //         sh 'npm run test'
        //         echo "Code analysis with Eslint"
        //         sh 'npm run lint'
        //     }
        // }
        stage('Code Quality Analysis') {
            steps {
                sh '/opt/homebrew/bin/sonar-scanner \
                    -D sonar.projectKey=nghminh2002_sit-753-task6-2 \
                    -D sonar.host.url=http://localhost:9000 \
                    -D sonar.login=admin \
                    -D sonar.password=admin123'
            }
        }
        // stage('Deploy') {
        //     steps {
        //         echo "Deploy to  DockerHub"
        //         script {
        //             docker.withRegistry("https://registry.hub.docker.com", 'millydocker') {
        //                 dockerImage.push()
        //             }
        //         sh "docker rmi -f millynguyen/milly-test:${env.BUILD_ID}"
        //         }
        //     }
        // }
        // stage('Release') {
        //     steps {
        //         echo "Release to production with Vercel"
        //         sh 'npm install -g vercel'
        //         sh 'VERCEL_ORG_ID=$VERCEL_ORG_ID VERCEL_PROJECT_ID=$VERCEL_PROJECT_ID vercel --token $VERCEL_TOKEN --prod'
        //     }
        // }
    }
}