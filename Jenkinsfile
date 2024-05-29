pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        imageName = "millytest1"
    }
    stages {
        // stage('Build') {
        //     agent any
        //     steps {
        //         script {
        //             dockerImage = docker.build imageName
        //         }
        //     }
        // }
        stage('Test') {
            steps {
                sh 'npm install'
                echo "run unit tests with Jest"
                sh 'npm run test'
                echo "code analysis with Eslint"
                sh 'npm run lint'
            }
            post {
                always {
                    script {
                        emailext body: "Build ${currentBuild.result}: ${env.JOB_NAME} #${env.BUILD_NUMBER}\n\nConsole output is attached.", 
                                subject: "${env.JOB_NAME} #${env.BUILD_NUMBER}: Build ${currentBuild.result}: ", 
                                mimeType: 'text/html', to: 's220466717@deakin.edu.au', 
                                attachLog: true
                    }
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                echo 'security scan with SonarCloud.'
            }
        }
        stage('Deploy') {
            steps {
                echo "deploy to staging with AWS EC2"
            }
        }
        stage('Release') {
            steps {
                echo "deploy to production with AWS EC2"
            }
        }
    }
}