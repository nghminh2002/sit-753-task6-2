pipeline {
    agent any
    environment {
        imageName = "millytest"
    }
    stages {
        // stage('Build') {
        //     steps {
        //         sh 'npm install -g npm@10.8.0 '
        //         sh 'npm install'
        //         sh 'npm run build'
        //     }
        // }
        stage('Build Images') {
            steps {
                script {
                    dockerImage = docker.build imageName
                }
            }
        }
        stage('Test') {
            steps {
                echo "run unit tests with Jest"
                echo "run integration tests with Cypress"
                echo "code analysis with Eslint"
                echo 'security scan with SonarCloud.'
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